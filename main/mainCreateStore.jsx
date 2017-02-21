import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import epic from './mainEpics.jsx'
import reducer from './mainReducers.jsx'
import {globalActions, setMainStore} from '../globalRedux.jsx'

const initialState = {
  loggedInUser: null,
  menuOpened: false,
  loginDialogOpened: false,
  registerDialogOpened: false,
  token: null,
  selectedCategoryID: 1,
  isInAboutPage: false,
  categories: [],
  title: '',
  isRoot: true
};

const globalMiddleware = store => next => action => {
  switch (action.type) {
    case "loggedIn":
      globalActions.loggedIn();
      break;
    case "loggedOut":
      globalActions.loggedOut();
      break;
    case "goBack":
      globalActions.goBack();
      break;
  }
  let result = next(action)
  return result
}

export default function(preState) {
  var epicMiddleware = createEpicMiddleware(epic);
  var finalCreateStore = applyMiddleware(globalMiddleware)(createStore);
  finalCreateStore = applyMiddleware(epicMiddleware)(finalCreateStore);
  let state = initialState;
  if (preState)
    state = Object.assign({}, state, preState);
  var store = finalCreateStore(reducer, state);
  setMainStore(store);
  return store;
}

