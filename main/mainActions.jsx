import {mainActions} from '../globalRedux.jsx'

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
  goBack: () => ({type: 'goBack'}),
};

export default Object.assign({}, actions, mainActions);
