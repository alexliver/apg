
export default function reducer(state, action) {
  switch (action.type) {
    case "loadedPost":
      return Object.assign({}, state, {
        post: action.loadedData,
        replies: action.loadedData.replies,
        loaded: true
      });
    case "editComment": 
      let newComments = Object.assign({}, state.comments, {
        [action.repliableID] : action.text
      });
      return Object.assign({}, state, {comments: newComments});
    case "submittingComment": 
      let newSubmittingComments = Object.assign({}, state.submittingComments, {
        [action.repliableID] : true
      });
      return Object.assign({}, state, {submittingComments: newSubmittingComments});
    case "submittedComment": 
      let newSubmittingComments2 = Object.assign({}, state.submittingComments, {
        [action.repliableID] : false
      });
      return Object.assign({}, state, {submittingComments: newSubmittingComments2});
    case 'loggedIn':
      return Object.assign({}, state, {loggedIn: true});
    case 'loggedOut':
      return Object.assign({}, state, {loggedIn: false});
  }
  return state;
}
