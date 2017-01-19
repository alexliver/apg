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
      return ajax.post(config.url + 'o/token/', {
        username, password,grant_type:"password", client_id: config.client_id, client_secret: config.client_secret
      }).map(res=>res.response).mergeMap(res => {
        sessionStorage.setItem("token", res.access_token);
        sessionStorage.setItem("username", username);
        return Observable.from([actions.loggedIn(res.access_token, res.refresh_token, username), actions.hideLoginDialog()])
      });
    });

    return Observable.merge(state$, ajax$);
  },
  register: (action$) => {
    let login$ = action$.ofType('register');
    let state$ = login$.map(action => actions.registering());
    let ajax$ = login$.mergeMap(action => {
      let username = action.username;
      let password = action.password;
      return ajax.post(config.url + 'sign_up/', {
        username, password
      }).map(res=>res.response).mergeMap(res => 
        Observable.from([actions.registered(res.username), actions.hideRegisterDialog(), 
          actions.login(username, password)])
      );
    });

    return Observable.merge(state$, ajax$);
  },
  loadCategories: (action$, store) => {
    return action$.ofType('loadCategories').filter(action => store.getState().categories.length == 0).mergeMap(action => {
      return ajax.getJSON(config.url + 'category/').map(json => actions.loadedCategories(json));
    });
  },
  
  logout: (action$) => action$.ofType('logout').map(action => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    return actions.loggedOut();
  }),
};

export default function (action$, store) {
  var streams = Object.keys(epics).map(function (key) { return epics[key](action$, store); });
  return Observable.merge.apply(Observable, streams);
}


