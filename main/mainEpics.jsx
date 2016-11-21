import {Observable } from 'rxjs'
import actions from './mainActions.jsx'
import config from '../config.jsx'
var ajax = Observable.ajax

const epics = {
  login: (action$) => {
    let login$ = action$.ofType('login');
    let state$ = login$.map(action => actions.loggingIn());
    let ajax$ = login$.mergeMap(action => {
      let username = action.username;
      let password = action.password;
      return ajax.post(config.url + 'login/', {
        username, password
      }).map(res=>res.response).mergeMap(res => 
        Observable.from([actions.loggedIn(res.token, res.user), actions.hideLoginDialog()])
      );
    });

    return Observable.merge(state$, ajax$);
  },
};

export default function (action$, store) {
  var streams = Object.keys(epics).map(function (key) { return epics[key](action$, store); });
  return Observable.merge.apply(Observable, streams);
}


