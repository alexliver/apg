import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import CategoryView from '../post/categoryView.jsx'
import actions from './mainActions.jsx'
import FlatButton from 'material-ui/FlatButton';
import { browserHistory} from 'react-router'
import LoginDialog from './login/loginDialog.jsx'
import RegisterDialog from './login/registerDialog.jsx'


export default class ToolbarExamplesSimple extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.loadCategories());
  }

  clickCategory(categoryID) {
    this.props.dispatch(actions.changeCategory(categoryID));
    browserHistory.push(`/category/${categoryID}`);
  }

  clickAbout() {
    this.props.dispatch(actions.goToAboutPage());
    browserHistory.push(`/about/`);
  }

  toggleMenu() {
    this.props.dispatch(actions.toggleMenu());
  }

  onLogin(username, password) {
    this.props.dispatch(actions.login(username, password));
  }

  onOpenLoginDialog() {
    this.props.dispatch(actions.openLoginDialog());
  }

  hideLoginDialog() {
    this.props.dispatch(actions.hideLoginDialog());
  }

  onRegister(username, password) {
    this.props.dispatch(actions.register(username, password));
  }

  onOpenRegisterDialog() {
    this.props.dispatch(actions.openRegisterDialog());
  }

  hideRegisterDialog() {
    this.props.dispatch(actions.hideRegisterDialog());
  }

  onLogout() {
    this.props.dispatch(actions.logout());
  }

  render() {
    const me = this;
    let menuItems;
    if (this.props.loggedInUserName) {
      menuItems = [
        <MenuItem>Hello, {this.props.loggedInUserName}</MenuItem>,
        <MenuItem primaryText="Log out" onTouchTap={me.onLogout.bind(me)}></MenuItem>,
      ]
    } else { 
      menuItems = [
        <MenuItem primaryText="Login" ref="loginMenuButton" onTouchTap={me.onOpenLoginDialog.bind(me)} />,
        <MenuItem primaryText="Register" onTouchTap={me.onOpenRegisterDialog.bind(me)} />
      ];
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
      <Paper>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            {[...this.props.categories.map(category => 
            <FlatButton
              label={category.name}
              primary={category.pk == me.props.selectedCategoryID}
              href={`/category/${category.pk}`}
              onTouchTap={() => me.clickCategory(category.pk)}
            />),
            <FlatButton
              label='About'
              href='/about/'
              primary={me.props.isInAboutPage}
              onTouchTap={() => me.clickAbout()}
            />
            ]}
          </ToolbarGroup>
          <ToolbarGroup>
            <IconMenu
              iconButtonElement={
                <IconButton touch={true}>
                  <NavigationExpandMoreIcon />
                </IconButton>
              }
              open={me.props.menuOpened}
              onRequestChange={me.toggleMenu.bind(me)}
              useLayerForClickAway={true}
            >
              {menuItems}
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <div style={{maxWidth: '800px', margin: 'auto'}}> {this.props.children || <CategoryView categoryID={1} />}
        </div>
        {loginDialog}
        {registerDialog}
      </Paper>
    );
  }
}
