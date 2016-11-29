import React from 'react';
import { connect } from 'react-redux'
import actions from './mainActions.jsx'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import LoginDialog from './login/loginDialog.jsx'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
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

const menuIcon = <FontIcon className="material-icons">more_vert</FontIcon>;
const backIcon = <FontIcon className="material-icons">chevron_left</FontIcon>;

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
    this.props.dispatch(actions.changeCategory(categoryID));
    hashHistory.push(`/category/${categoryID}`);
  }

  clickBack() {
    //hashHistory.goBack();
    this.props.dispatch(actions.goBack());
  }

  getCategoryIndex() {
    return this.props.categories.findIndex((category) => category.pk == this.props.selectedCategoryID);
  }

  getTitle() {
    const category = this.props.categories.find((category) => category.pk == this.props.selectedCategoryID);
    if (category)
      return category.name;
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
            title={this.getTitle()}
            iconElementRight={<IconButton onClick={this.toggleMenu.bind(this)}>{menuIcon}</IconButton>}
            iconElementLeft={me.props.isRoot?null:<IconButton onClick={this.clickBack.bind(this)}>{backIcon}</IconButton>}
            showMenuIconButton={!me.props.isRoot}
            style={{flex: "0 0 auto"}}
          />
          <div style={{flex: "1 1 auto", 'overflow-y': 'auto'}}>
            {this.props.children || <CategoryView categoryID={1} />}
          </div>
          <BottomNavigation selectedIndex={this.getCategoryIndex()} style={{flex: "0 0 auto"}}>
            {this.props.categories.map(category => 
            <BottomNavigationItem
              label={category.name}
              icon={getCategoryIcon(category.iconType)}
              onTouchTap={() => me.clickCategory(category.pk)}
            />)}
          </BottomNavigation>
        </Paper>
        <Drawer open={this.props.menuOpened} docked={false} onRequestChange={this.hangleMenuChange.bind(this)} openSecondary={true}>
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
    selectedCategoryID: state.selectedCategoryID,
    categories: state.categories,
    title: state.title,
    loggedInUserID, loggedInUserName,
    isRoot: state.isRoot,
  };
}

const ConnectedMainComponent = connect(mapStateToProps)(MainComponent)

export default ConnectedMainComponent

