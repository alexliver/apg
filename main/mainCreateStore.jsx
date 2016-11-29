import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import epic from './mainEpics.jsx'
import reducer from './mainReducers.jsx'
import {globalActions, setMainStore} from '../globalRedux.jsx'

const initialState = {
  loggedInUser: null,
  menuOpened: false,
  loginDialogOpened: false,
  token: null,
  selectedCategoryID: 1,
  categories: [],
  title: '',
  isRoot: true
};

const globalMiddleware = store => next => action => {
  switch (action.type) {
    case "loggedIn":
      globalActions.loggedIn(action.user.pk);
      break;
    case "goBack":
      globalActions.goBack();
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
  setMainStore(store);
  return store;
}

