const actions = {
  toggleMenu: () => ({type: 'toggleMenu'}),
  setMenuOpen: (open) => ({type: 'toggleMenu', open}),
  login: (username, password) => ({type: 'login', username, password}),
  loggingIn: () => ({type: 'loggingIn'}),
  loggedIn: (token, user) => ({type: 'loggedIn', token, user}),

  openLoginDialog: () => ({type: 'openLoginDialog'}),
  hideLoginDialog: () => ({type: 'hideLoginDialog'}),
  loadedCategories: (categories) => ({type: 'loadedCategories', categories}),
  loadCategories: () => ({type: 'loadCategories'}),
};

export default actions;
