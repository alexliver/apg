import { globalCreateStore } from '../globalRedux.jsx'
import epic from './postEpics.jsx'
import reducer from './postReducers.jsx'

const initialState = {
  loggedInUserID: null,
  post: {
    title: 'Loading...',
    content: 'Loading...'
  },
  comments: {},
  submittingComments: {},
  loaded: false
};

export default function() {
  return globalCreateStore(initialState, reducer, epic);
}
