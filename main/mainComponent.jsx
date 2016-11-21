import React from 'react';
import { connect } from 'react-redux'
import actions from './mainActions.jsx'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import LoginDialog from './login/loginDialog.jsx'


class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  componentDidMount() {
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

  onOpenLoginDialog() {
    this.props.dispatch(actions.openLoginDialog());
  }

  hideLoginDialog() {
    this.props.dispatch(actions.hideLoginDialog());
  }

  render () {
    let menuItems ;
    if (this.props.loggedInUserID) {
      menuItems = [<MenuItem>Hello, {this.props.loggedInUserName}</MenuItem>]
    } else {
      menuItems = [<MenuItem onClick={this.onOpenLoginDialog.bind(this)}>Login</MenuItem>]
    }

    return (
      <div>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onClick={this.toggleMenu.bind(this)}
        />
        <Drawer open={this.props.menuOpened} docked={false} onRequestChange={this.hangleMenuChange.bind(this)}>
          {menuItems}
        </Drawer>
        <LoginDialog open={this.props.loginDialogOpened} onLogin={this.onLogin.bind(this)} onCancel={this.hideLoginDialog.bind(this)} />
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  let loggedInUserID = null, loggedInUserName = null;
  if (state.loggedInUser) {
    loggedInUserID = state.loggedInUser.pk;
    loggedInUserName = state.loggedInUser.username;
  }
  return {
    menuOpened: state.menuOpened,
    loginDialogOpened: state.loginDialogOpened,
    loggedInUserID, loggedInUserName
  };
}

const ConnectedMainComponent = connect(mapStateToProps)(MainComponent)

export default ConnectedMainComponent

