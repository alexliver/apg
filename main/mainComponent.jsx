import React from 'react';
import { connect } from 'react-redux'
import actions from './mainActions.jsx'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import LoginDialog from './login/loginDialog.jsx'
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Paper from 'material-ui/Paper';
import { hashHistory} from 'react-router'
import CategoryView from '../post/categoryView.jsx'


const getCategoryIcon = (iconType) => {
  
  switch (iconType) {
    case "music": 
      return <FontIcon className="material-icons">music_video</FontIcon>;
    case "programming": 
      return <FontIcon className="material-icons">code</FontIcon>;
    default:
      return <FontIcon className="material-icons">restore</FontIcon>;
  }
}

class MainComponent extends React.Component {
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

  onOpenLoginDialog() {
    this.props.dispatch(actions.openLoginDialog());
  }

  hideLoginDialog() {
    this.props.dispatch(actions.hideLoginDialog());
  }

  clickCategory(categoryID) {
    hashHistory.push(`/category/${categoryID}`);
  }

  render () {
    const me = this;
    let menuItems ;
    if (this.props.loggedInUserID) {
      menuItems = [<MenuItem>Hello, {this.props.loggedInUserName}</MenuItem>]
    } else {
      menuItems = [<MenuItem onClick={this.onOpenLoginDialog.bind(this)}>Login</MenuItem>]
    }

    return (
      <div>
        <Paper style={{display:'flex', height: '100%', 'flex-direction': 'column'}}>
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onClick={this.toggleMenu.bind(this)}
            style={{flex: "0 0 auto"}}
          />
          <div style={{flex: "1 1 auto", 'overflow-y': 'auto'}}>
            {this.props.children || <CategoryView categoryID={1} />}
          </div>
          <BottomNavigation selectedIndex={this.props.selectedIndex} style={{flex: "0 0 auto"}}>
            {this.props.categories.map(category => 
            <BottomNavigationItem
              label={category.name}
              icon={getCategoryIcon(category.iconType)}
              onTouchTap={() => me.clickCategory(category.pk)}
            />)}
          </BottomNavigation>
        </Paper>
        <Drawer open={this.props.menuOpened} docked={false} onRequestChange={this.hangleMenuChange.bind(this)}>
          {menuItems}
        </Drawer>
        <LoginDialog open={this.props.loginDialogOpened} onLogin={this.onLogin.bind(this)} onCancel={this.hideLoginDialog.bind(this)} />
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
    selectedIndex: state.selectedIndex,
    categories: state.categories,
    loggedInUserID, loggedInUserName
  };
}

const ConnectedMainComponent = connect(mapStateToProps)(MainComponent)

export default ConnectedMainComponent

