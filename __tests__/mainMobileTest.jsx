import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {mount, ReactWrapper} from 'enzyme';
import sinon from 'sinon';
import MainView from '../main/mainView.jsx';
import MainComponentMobile from '../main/mainComponentMobile.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {globalActions} from '../globalRedux.jsx';
import {mockSessionStorage} from '../testUtil.jsx';
import mainTestProcess from './mainTestProcess.jsx';

jest.mock('../util.jsx');

function beforeEach() {
  require('../util.jsx').setMobile(true);
}

function afterEach() {
  require('../util.jsx').setMobile(false);
}

function clickLogin(mainView) {
  mainView.find('AppBar').prop('iconElementRight').props.onClick();

  expect(mainView.html().indexOf('Login')).toBeGreaterThan(-1);
  global.mainMenuItems[0].props.onClick();

  const loginDialog = mainView.find('LoginDialog');
  expect(loginDialog).toHaveLength(1);
  expect(loginDialog.prop("open")).toBeTruthy();
  
}

function clickLogout(mainView) {
  mainView.find('AppBar').prop('iconElementRight').props.onClick();

  expect(document.body.innerHTML.indexOf('Login')).toBeGreaterThan(-1);//???
  global.mainMenuItems[1].props.onClick();
}

function clickRegister(mainView) {
  mainView.find('AppBar').prop('iconElementRight').props.onClick();

  //expect(document.body.innerHTML.indexOf('Login')).toBeGreaterThan(-1);
  global.mainMenuItems[1].props.onClick();

  const registerDialog = mainView.find('RegisterDialog');
  expect(registerDialog).toHaveLength(1);
  expect(registerDialog.prop("open")).toBeTruthy();
}

function clickCategory(mainView, categoryID) {
  const navItem = mainView.find('BottomNavigation BottomNavigationItem').get(categoryID - 1);
  navItem.props.onTouchTap();
}

function checkIsLoggedIn(mainView) {
  expect(mainView.find(MainComponentMobile).prop('loggedInUserName')).toBeTruthy();
}

function checkIsLoggedOut(mainView) {
  expect(mainView.find(MainComponentMobile).prop('loggedInUserName')).not.toBeTruthy();
}

mainTestProcess({clickLogin, clickLogout, clickRegister, clickCategory, checkIsLoggedIn, checkIsLoggedOut , beforeEach, afterEach});

