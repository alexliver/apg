import React from 'react';
import actions from './mainActions.jsx'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import LoginDialog from './login/loginDialog.jsx'
import RegisterDialog from './login/registerDialog.jsx'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Paper from 'material-ui/Paper';
import { browserHistory} from 'react-router'
import CategoryView from '../post/categoryView.jsx'
import IconMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconMusicVideo from 'material-ui/svg-icons/av/music-video';
import IconCode from 'material-ui/svg-icons/action/code';
import IconRestore from 'material-ui/svg-icons/action/restore';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconInfo from 'material-ui/svg-icons/action/info';


const getCategoryIcon = (iconType) => {
  
  switch (iconType) {
    case "music": 
      return <IconMusicVideo />;
    case "programming": 
      return <IconCode />;
    case "about": 
      return <IconInfo />;
    default:
      return <IconRestore />;
  }
}

const menuIcon = <IconMoreVert />;
const backIcon = <IconArrowBack />;

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  componentDidMount() {
    this.props.dispatch(actions.loadCategories());
  }

  toggleMenu() {
    this.props.dispatch(actions.toggleMenu());
  }

  hangleMenuChange(open) {
    this.props.dispatch(actions.setMenuOpen(open));
  }

  onLogin(username, password) {
    this.props.dispatch(actions.login(username, password));
  }

  onLogout() {
    this.props.dispatch(actions.logout());
  }

  onRegister(username, password) {
    this.props.dispatch(actions.register(username, password));
  }

  onOpenLoginDialog() {
    this.props.dispatch(actions.openLoginDialog());
  }

  onOpenRegisterDialog() {
    this.props.dispatch(actions.openRegisterDialog());
  }

  hideLoginDialog() {
    this.props.dispatch(actions.hideLoginDialog());
  }

  hideRegisterDialog() {
    this.props.dispatch(actions.hideRegisterDialog());
  }

  clickCategory(categoryID) {
    this.props.dispatch(actions.changeCategory(categoryID));
    browserHistory.push(`/category/${categoryID}`);
  }

  clickAbout() {
    this.props.dispatch(actions.goToAboutPage());
    browserHistory.push(`/about/`);
  }

  clickBack() {
    //hashHistory.goBack();
    this.props.dispatch(actions.goBack());
  }

  getButtonTabIndex() {
    if (this.props.isInAboutPage)
      return this.props.categories.length;
    return this.props.categories.findIndex((category) => category.pk == this.props.selectedCategoryID);
  }

  getTitle() {
    const category = this.props.categories.find((category) => category.pk == this.props.selectedCategoryID);
    if (category)
      return category.name;
    return "About";
  }

  render () {
    const me = this;
    let menuItems ;
    if (this.props.loggedInUserName) {
      menuItems = [
        <MenuItem>Hello, {this.props.loggedInUserName}</MenuItem>,
        <MenuItem onClick={me.onLogout.bind(me)}>Log out</MenuItem>,
      ]
    } else {
      menuItems = [
        <MenuItem onClick={this.onOpenLoginDialog.bind(this)}>Login</MenuItem>,
        <MenuItem onClick={this.onOpenRegisterDialog.bind(this)}>Register</MenuItem>,
      ]
    }

    const loginDialog =
        <LoginDialog open={this.props.loginDialogOpened} onLogin={this.onLogin.bind(this)} onCancel={this.hideLoginDialog.bind(this)} 
            loginError={this.props.loginFail?'login failed':''}/>;
    const registerDialog = 
        <RegisterDialog open={this.props.registerDialogOpened} onRegister={this.onRegister.bind(this)} 
            onCancel={this.hideRegisterDialog.bind(this)} />;

    // this is to make the menu items accessible to enzyme: https://github.com/airbnb/enzyme/issues/252
    if (global.__isTest__) {
      global.mainMenuItems = menuItems;
      global.loginDialog = loginDialog;
      global.registerDialog = registerDialog;
    }

    return (
      <div>
        <Paper style={{display:'flex', height: '100%', 'flexDirection': 'column'}}>
          <AppBar
            title={this.getTitle()}
            iconElementRight={<IconButton onClick={this.toggleMenu.bind(this)}>{menuIcon}</IconButton>}
            iconElementLeft={me.props.isRoot?null:<IconButton onClick={this.clickBack.bind(this)}>{backIcon}</IconButton>}
            showMenuIconButton={!me.props.isRoot}
            style={{flex: "0 0 auto"}}
          />
          <div style={{flex: "1 1 auto", 'overflowY': 'auto'}}>
            {this.props.children || <CategoryView categoryID={1} />}
          </div>
          <BottomNavigation selectedIndex={this.getButtonTabIndex()} style={{flex: "0 0 auto"}}>
            {[...this.props.categories.map(category => 
              <BottomNavigationItem
                label={category.name}
                icon={getCategoryIcon(category.iconType)}
                onTouchTap={() => me.clickCategory(category.pk)}
              />), 
              <BottomNavigationItem
                label='About'
                icon={getCategoryIcon("about")}
                onTouchTap={() => me.clickAbout()}
              />, 
            ]}
          </BottomNavigation>
        </Paper>
        <Drawer open={this.props.menuOpened} docked={false} onRequestChange={this.hangleMenuChange.bind(this)} openSecondary={true}>
          {menuItems}
        </Drawer>
        {loginDialog}
        {registerDialog}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  let loggedInUserName = null;
  if (state.username) {
    loggedInUserName = username;
  }
  return {
    menuOpened: state.menuOpened,
    loginDialogOpened: state.loginDialogOpened,
    registerDialogOpened: state.registerDialogOpened,
    selectedCategoryID: state.selectedCategoryID,
    categories: state.categories,
    title: state.title,
    loggedInUserName,
    isRoot: state.isRoot,
  };
}


