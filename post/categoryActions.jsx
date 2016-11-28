import {Observable } from 'rxjs'
import config from '../config.jsx'
var ajax = Observable.ajax

const epics = {
  loadCategory: function(action$) {
    return action$.ofType('loadCategory').mergeMap(action => {
      return ajax.getJSON(config.url + 'categoryPostList/' + action.id + '/').map(res => actions.loadedCategory(res));
    });
  },

};

export const epic = (action$, store) => {
  var streams = Object.keys(epics).map(function (key) { return epics[key](action$, store); });
  return Observable.merge.apply(Observable, streams);
}


const actions = {
  loadCategory: function(id) {
    return {type: 'loadCategory', id: id};
  },

  loadedCategory: function(res) {
    return {type: 'loadedCategory', posts: res};
  },
};

export default actions;

