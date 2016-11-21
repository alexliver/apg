const actions = {
  toggleMenu: () => ({type: 'toggleMenu'}),
  setMenuOpen: (open) => ({type: 'toggleMenu', open}),
  login: (username, password) => ({type: 'login', username, password}),
  loggingIn: () => ({type: 'loggingIn'}),
  loggedIn: (token, user) => ({type: 'loggedIn', token, user}),

  openLoginDialog: () => ({type: 'openLoginDialog'}),
  hideLoginDialog: () => ({type: 'hideLoginDialog'}),
};

export default actions;
