import { globalCreateStore } from '../globalRedux.jsx'

const initialState = {
};

function reducer(state, action) {
  return state;
}

const epic = (action$, store) => {
}

export default function(preState) {
  return globalCreateStore(Object.assign({}, initialState, preState), reducer);
}


