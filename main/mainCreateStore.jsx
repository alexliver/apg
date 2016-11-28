import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import epic from './mainEpics.jsx'
import reducer from './mainReducers.jsx'
import {globalActions} from '../globalRedux.jsx'

const initialState = {
  loggedInUser: null,
  menuOpened: false,
  loginDialogOpened: false,
  token: null,
  selectedIndex: 0,
  categories: []
};

const globalMiddleware = store => next => action => {
  switch (action.type) {
    case "loggedIn":
      globalActions.loggedIn(action.user.pk);
      break;
  }
  let result = next(action)
  return result
}

export default function() {
  var epicMiddleware = createEpicMiddleware(epic);
  var finalCreateStore = applyMiddleware(globalMiddleware)(createStore);
  finalCreateStore = applyMiddleware(epicMiddleware)(finalCreateStore);
  var store = finalCreateStore(reducer, initialState);
  return store;
}

