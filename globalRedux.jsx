import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

const stores = []
export function globalCreateStore(initialState, reducer, epic) {
  var epicMiddleware = createEpicMiddleware(epic);
  var finalCreateStore = applyMiddleware(epicMiddleware)(createStore);
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

  loggedOut: () => ({type: 'loggedOut'})
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
  }
};
