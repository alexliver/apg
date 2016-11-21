export default function reducer(state, action) {
  switch (action.type) {
    case "toggleMenu": 
      return Object.assign({}, state, {menuOpened: !state.menuOpened});
    case "setMenuOpen": 
      return Object.assign({}, state, {menuOpened: action.open});
    case "openLoginDialog": 
      return Object.assign({}, state, {loginDialogOpened: true});
    case "hideLoginDialog": 
      return Object.assign({}, state, {loginDialogOpened: false});
    case "loggedIn":
      return Object.assign({}, state, {token: action.token, loggedInUser: action.user});
  }
  return state;
}

