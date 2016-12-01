import React from 'react';
import { connect } from 'react-redux'
import MainComponentMobile from './mainComponentMobile.jsx'
import MainComponentDesktop from './mainComponentDesktop.jsx'
import {isMobile} from '../util.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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


const MainComponent = (props) => {
  let ConnectedMainComponent = null;
  if (isMobile())
    ConnectedMainComponent = connect(mapStateToProps)(MainComponentMobile );
  else
    ConnectedMainComponent = connect(mapStateToProps)(MainComponentDesktop );
  return <MuiThemeProvider><ConnectedMainComponent children={props.children} /></MuiThemeProvider>
}

export default MainComponent

