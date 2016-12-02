import { globalCreateStore } from '../globalRedux.jsx'
import epic from './postEpics.jsx'
import reducer from './postReducers.jsx'

const initialState = {
  loggedInUserID: null,
  post: {
    title: 'Loading...',
    content: 'Loading...'
  },
  replies: [],
  comments: {},
  submittingComments: {},
  loaded: false
};

export default function(preState) {
  return globalCreateStore(Object.assign({}, initialState, preState), reducer, epic);
}
