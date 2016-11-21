import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import epic from './postEpics.jsx'
import reducer from './postReducers.jsx'

const initialState = {
  loggedInUserID: 1,
  post: {
    title: 'Loading...',
    content: 'Loading...'
  },
  comments: {},
  submittingComments: {},
  loaded: false
};

export default function() {
  var epicMiddleware = createEpicMiddleware(epic);
  var finalCreateStore = applyMiddleware(epicMiddleware)(createStore);
  var store = finalCreateStore(reducer, initialState);

  return store
}
