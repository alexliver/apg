import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { hashHistory} from 'react-router'

let mainStore = null;
export function setMainStore(store) {
  mainStore = store;
}

export const mainActions = {
  changeCategory: (categoryID) => ({type:'changeCategory', categoryID}),
  setIsRoot: (isRoot) => ({type: 'setIsRoot', isRoot}),
  loadURL: url => ({type: 'loadURL', url}),
}

const globalMiddleware = store => next => action => {
  switch (action.type) {
    case "changeCategory":
    case "setIsRoot":
      mainStore.dispatch(action);
      break;
    case 'loadURL':
      hashHistory.push(action.url);
      break;
    default:
      let result = next(action)
      return result
  }
}

const stores = []
export function globalCreateStore(initialState, reducer, epic) {
  var epicMiddleware = createEpicMiddleware(epic);
  var finalCreateStore = applyMiddleware(globalMiddleware)(createStore);
  finalCreateStore = applyMiddleware(epicMiddleware)(finalCreateStore);
  var store = finalCreateStore(reducer, initialState);

  stores.push(store);
  return store;
}

const actions = {
  loggedIn: function(loggedInUserID) {
    return {
      type: 'loggedIn',
      loggedInUserID: loggedInUserID
    };
  },

  loggedOut: () => ({type: 'loggedOut'}),

  goBack: () => ({type: 'goBack'}),
};

export const globalActions = {
  loggedIn: function(loggedInUserID) {
    stores.forEach(store => {
      store.dispatch(actions.loggedIn(loggedInUserID));
    });
  },

  loggedOut: function() {
    stores.forEach(store => {
      store.dispatch(actions.loggedOut());
    });
  },

  goBack: () => stores.forEach(store => {
    store.dispatch(actions.goBack());
  }),
  
};
