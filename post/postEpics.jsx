import {Observable } from 'rxjs'
import actions from './postActions.jsx'
import {mainActions} from '../globalRedux.jsx'
import config from '../config.jsx'
var ajax = Observable.ajax

const epics = {
  loadPost: function(action$) {
    return  action$.filter(function(action) {
      return action.type === 'loadPost' && action.id;
    }).mergeMap(function(action) {
      return ajax.getJSON(config.url + 'post/' + action.id + '/')
        .mergeMap(res => Observable.from([ 
          actions.loadedPost(res) , 
          mainActions.changeCategory(res.category.pk) 
        ]));

    });
  },

  submitComment: function(action$, store) {
    let submit$ = action$.ofType('submitComment');
    let state$ = submit$.map(action => actions.submittingComment(action.repliableID));
    let ajax$ = submit$.mergeMap(action => {
      let repliableID = action.repliableID;
      let text = store.getState().comments[repliableID];
      let writerID = store.getState().loggedInUserID;
      return ajax.post(config.url + 'reply/', {
        to: repliableID,
        content: text,
        writerID
      }).map(() => actions.submittedComment(repliableID));
    });

    return Observable.merge(state$, ajax$);
  },

  firstLoadPost: (action$, store) => action$.ofType('firstLoadPost')
    .filter(action => !store.getState().loaded)
    .map(action => actions.loadPost(action.id)),

  goBack: (action$, store) => action$.ofType('goBack').map(action => mainActions.loadURL(`/category/${store.getState().post.category.pk}`)),
  
};

export default function (action$, store) {
  var streams = Object.keys(epics).map(function (key) { return epics[key](action$, store); });
  return Observable.merge.apply(Observable, streams);
}

