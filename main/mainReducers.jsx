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
    case "openRegisterDialog": 
      return Object.assign({}, state, {registerDialogOpened: true});
    case "hideRegisterDialog": 
      return Object.assign({}, state, {registerDialogOpened: false});
    case "loggedIn":
      return Object.assign({}, state, {token: action.access_token, username: action.username });
    case "loadedCategories":
      return Object.assign({}, state, {categories: action.categories});
    case "changeCategory":
      return Object.assign({}, state, {selectedCategoryID: action.categoryID});
    case "setIsRoot" :
      return Object.assign({}, state, {isRoot: action.isRoot});
    case "loggedOut" :
      return Object.assign({}, state, {token: null, username: null});
  }
  return state;
}

