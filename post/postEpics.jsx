import {Observable } from 'rxjs'
import actions from './postActions.jsx'
import config from '../config.jsx'
var ajax = Observable.ajax

const epics = {
  loadPost: function(action$) {
    return  action$.filter(function(action) {
      return action.type === 'loadPost' && action.id;
    }).mergeMap(function(action) {
        var ajax$ = ajax.getJSON(config.url + 'post/' + action.id + '/');
        var loaded$ = ajax$.map(function(res) {
          return actions.loadedPost(res);
        });

        return loaded$;
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
  }
};

export default function (action$, store) {
  var streams = Object.keys(epics).map(function (key) { return epics[key](action$, store); });
  return Observable.merge.apply(Observable, streams);
}

