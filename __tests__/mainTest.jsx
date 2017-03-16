import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {mount, ReactWrapper} from 'enzyme';
import sinon from 'sinon';
import MainView from '../main/mainView.jsx';
import MainComponentDesktop from '../main/mainComponentDesktop.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {globalActions} from '../globalRedux.jsx';
import {mockSessionStorage} from '../testUtil.jsx';
import mainTestProcess from './mainTestProcess.jsx';

function clickLogin(mainView) {
  expect(mainView.find('IconMenu')).toHaveLength(1);
  mainView.find('IconMenu').prop('onRequestChange')();

  expect(document.body.innerHTML.indexOf('Login')).toBeGreaterThan(-1);
  global.mainMenuItems[0].props.onTouchTap();

  const loginDialog = mainView.find('LoginDialog');
  expect(loginDialog).toHaveLength(1);
  expect(loginDialog.prop("open")).toBeTruthy();
  
}

function clickLogout(mainView) {
  mainView.find('IconMenu').prop('onRequestChange')();

  expect(document.body.innerHTML.indexOf('Login')).toBeGreaterThan(-1);//???
  global.mainMenuItems[1].props.onTouchTap();
}

function clickRegister(mainView) {
  mainView.find('IconMenu').prop('onRequestChange')();

  expect(document.body.innerHTML.indexOf('Login')).toBeGreaterThan(-1);
  global.mainMenuItems[1].props.onTouchTap();

  const registerDialog = mainView.find('RegisterDialog');
  expect(registerDialog).toHaveLength(1);
  expect(registerDialog.prop("open")).toBeTruthy();
}

function checkIsLoggedIn(mainView) {
  expect(mainView.find(MainComponentDesktop).prop('loggedInUserName')).toBeTruthy();
}

function checkIsLoggedOut(mainView) {
  expect(mainView.find(MainComponentDesktop).prop('loggedInUserName')).not.toBeTruthy();
}

mainTestProcess({clickLogin, clickLogout, clickRegister, checkIsLoggedIn, checkIsLoggedOut });
