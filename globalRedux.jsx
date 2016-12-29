import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { browserHistory} from 'react-router'

let mainStore = null;
export function setMainStore(store) {
  mainStore = store;
}

function isLoggedIn() {
  if (!mainStore) return false;
  if (mainStore.getState().token)
    return true;
  return false;
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
      browserHistory.push(action.url);
      break;
    default:
      let result = next(action)
      return result
  }
}

const stores = []
export function globalCreateStore(initialState, reducer, epic) {
  if (!initialState) initialState = {};
  initialState.loggedIn = isLoggedIn();
  var epicMiddleware = createEpicMiddleware(epic);
  var finalCreateStore = applyMiddleware(globalMiddleware)(createStore);
  finalCreateStore = applyMiddleware(epicMiddleware)(finalCreateStore);
  var store = finalCreateStore(reducer, initialState);

  stores.push(store);
  return store;
}

const actions = {
  loggedIn: function() {
    return {
      type: 'loggedIn',
    };
  },

  loggedOut: () => ({type: 'loggedOut'}),

  goBack: () => ({type: 'goBack'}),
};

export const globalActions = {
  loggedIn: function() {
    stores.forEach(store => {
      store.dispatch(actions.loggedIn());
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
