import { globalCreateStore } from '../globalRedux.jsx'
import {epic} from './categoryActions.jsx'

const initialState = {
  posts: [],
  loaded: false
};

function reducer(state, action) {
  switch (action.type) {
    case "loadedCategory":
      return Object.assign({}, state, {
        posts: action.posts,
        loaded: true
      });
  }
  return state;
}

export default function() {
  return globalCreateStore(initialState, reducer, epic);
}

