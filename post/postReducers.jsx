
export default function reducer(state, action) {
  switch (action.type) {
    case "loadedPost":
      return Object.assign({}, state, {
        post: action.loadedData,
        loaded: true
      });
  }
  return state;
}
