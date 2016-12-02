
const actions = {
  loadPost: function(id) {
    return {type: 'loadPost', id: id};
  },

  loadedPost: function(res) {
    return {type: 'loadedPost', loadedData: res};
  },

  editComment: function(repliableID, text) {
    return {type: 'editComment', repliableID, text};
  },

  submitComment: function(repliableID) {
    return {type: 'submitComment', repliableID};
  },

  submittingComment: function(repliableID) {
    return {type: 'submittingComment', repliableID};
  },

  submittedComment: function(repliableID) {
    return {type: 'submittedComment', repliableID};
  },

  firstLoadPost: id => ({type: 'firstLoadPost', id}),
};

export default actions;
