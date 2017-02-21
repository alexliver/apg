import {mainActions} from '../globalRedux.jsx'

const actions = {
  toggleMenu: () => ({type: 'toggleMenu'}),
  setMenuOpen: (open) => ({type: 'toggleMenu', open}),
  login: (username, password) => ({type: 'login', username, password}),
  loggingIn: () => ({type: 'loggingIn'}),
  loggedIn: (access_token, refresh_token, username) => ({type: 'loggedIn', access_token, refresh_token, username}),

  register: (username, password) => ({type: 'register', username, password}),
  registering: () => ({type: 'registering'}),
  registered: (username) => ({type: 'registered', username}),

  openLoginDialog: () => ({type: 'openLoginDialog'}),
  hideLoginDialog: () => ({type: 'hideLoginDialog'}),

  openRegisterDialog: () => ({type: 'openRegisterDialog'}),
  hideRegisterDialog: () => ({type: 'hideRegisterDialog'}),

  loadedCategories: (categories) => ({type: 'loadedCategories', categories}),
  loadCategories: () => ({type: 'loadCategories'}),
  goBack: () => ({type: 'goBack'}),

  logout: () => ({type: 'logout'}),
  loggedOut: () => ({type: 'loggedOut'}),

};

export default Object.assign({}, actions, mainActions);
