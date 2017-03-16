import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {mount, ReactWrapper} from 'enzyme';
import sinon from 'sinon';
import MainView from '../main/mainView.jsx';
import MainComponentDesktop from '../main/mainComponentDesktop.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {globalActions} from '../globalRedux.jsx';
import {mockSessionStorage} from '../testUtil.jsx';
injectTapEventPlugin();

jest.mock('react-router');
var xhr, requests;
export default function mainTestProcess(mainTestFuncs) {

  beforeEach(function () {
    global.__isTest__ = true;
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) { 
      console.log('xhr created');
      requests.push(req); 
    };

    mockSessionStorage();
    if (mainTestFuncs.beforeEach) mainTestFuncs.beforeEach();
  });

  afterEach(function () {
      xhr.restore();
      if (mainTestFuncs.afterEach) mainTestFuncs.afterEach();
  });


  it('loads main page', () => {
    const params = {};
    let mainView = mount(
      <MuiThemeProvider>
        <MainView  params={params} />
      </MuiThemeProvider>
    );


    const categories = [{
      pk: 1,
      name: 'test_category'
    }];
    requests.find(request => request.url.endsWith('category/')).respond(200, {"Content-Type": "application/json"}, JSON.stringify(categories));

    const html = mainView.html();
    expect(html.indexOf('test_writeraaaaa')).toEqual(-1);
    expect(html.indexOf('test_category')).toBeGreaterThan(-1);
    expect(mainView.find('CategoryView')).toHaveLength(1);
  });

  it('logs in', () => {
    const params = {};
    let mainView = mount(
      <MuiThemeProvider>
        <MainView  params={params} />
      </MuiThemeProvider> );

    loginProcess(mainView, mainTestFuncs);
    mainTestFuncs.checkIsLoggedIn(mainView);
  });

  it('logs out', () => {
    const params = {};
    let mainView = mount(
      <MuiThemeProvider>
        <MainView  params={params} />
      </MuiThemeProvider> );

    loginProcess(mainView, mainTestFuncs);
    mainTestFuncs.clickLogout(mainView);
    mainTestFuncs.checkIsLoggedOut(mainView);
  });

  it('registers', () => {
    const params = {};
    let mainView = mount(
      <MuiThemeProvider>
        <MainView  params={params} />
      </MuiThemeProvider> );

    mainTestFuncs.clickRegister(mainView);
    const registerDialog = global.registerDialog;
    const oriRequestLength = requests.length;
    registerDialog.props.onRegister('test_user', 'test_password');
    expect(requests).toHaveLength(oriRequestLength + 1);
    expect(requests[oriRequestLength].requestBody.indexOf('test_user')).toBeGreaterThan(-1);
    expect(requests[oriRequestLength].requestBody.indexOf('test_password')).toBeGreaterThan(-1);

    const registeredData = {
      username: 'test_user',
    };
    requests[oriRequestLength].respond(200, {"Content-Type": "application/json"}, JSON.stringify(registeredData));
    expect(requests).toHaveLength(oriRequestLength + 2);
    const loginData = {
      access_token: 'test_token',
      refresh_token: 'test_refresh_token'
    };
    requests[oriRequestLength+1].respond(200, {"Content-Type": "application/json"}, JSON.stringify(loginData));
    mainTestFuncs.checkIsLoggedIn(mainView);
  });

  it('login fails', () => {
    const params = {};
    let mainView = mount(
      <MuiThemeProvider>
        <MainView  params={params} />
      </MuiThemeProvider> );
    mainTestFuncs.clickLogin(mainView);
    let loginDialog = global.loginDialog;
    const oriRequestLength = requests.length;
    loginDialog.props.onLogin('test_user', 'test_password');

    requests[oriRequestLength].respond(403, {"Content-Type": "application/json"}, JSON.stringify({}));
    loginDialog = global.loginDialog;
    expect(loginDialog.props.loginError).toBeTruthy();
  });

}

function loginProcess(mainView, mainTestFuncs) {
  mainTestFuncs.clickLogin(mainView);
  const loginDialog = global.loginDialog;
  const oriRequestLength = requests.length;
  loginDialog.props.onLogin('test_user', 'test_password');
  expect(requests).toHaveLength(oriRequestLength + 1);
  expect(requests[oriRequestLength].requestBody.indexOf('test_user')).toBeGreaterThan(-1);
  expect(requests[oriRequestLength].requestBody.indexOf('test_password')).toBeGreaterThan(-1);

  const loginData = {
    access_token: 'test_token',
    refresh_token: 'test_refresh_token'
  };
  requests[oriRequestLength].respond(200, {"Content-Type": "application/json"}, JSON.stringify(loginData));
}

it('dumps', () => {});
