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
};

export default function (action$) {
  var streams = Object.keys(epics).map(function (key) { return epics[key](action$); });
  return Observable.merge.apply(Observable, streams);
}

