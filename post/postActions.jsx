
const actions = {
  loadPost: function(id) {
    return {type: 'loadPost', id: id};
  },

  loadedPost: function(res) {
    return {type: 'loadedPost', loadedData: res};
  },
};

export default actions;
