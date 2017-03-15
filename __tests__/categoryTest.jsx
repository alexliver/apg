import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {mount} from 'enzyme';
import sinon from 'sinon';
import CategoryView from '../post/categoryView.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {globalActions} from '../globalRedux.jsx';
import {mockSessionStorage} from '../testUtil.jsx';
injectTapEventPlugin();

var xhr, requests;

beforeEach(function () {
  xhr = sinon.useFakeXMLHttpRequest();
  requests = [];
  xhr.onCreate = function (req) { 
    console.log('xhr created');
    requests.push(req); 
  };

  mockSessionStorage();
});

afterEach(function () {
    xhr.restore();
});


it('loads category', () => {
  const params = {categoryID: 1};
  let categoryView = mount(
    <MuiThemeProvider>
      <CategoryView  params={params} />
    </MuiThemeProvider>
  );

  const data = [{
    replies: [{
      writer: {
        username: 'test_reply_writer'
      }, 
      content: 'test_reply_content',
      replies: []
    }],
    writer : {
      username: 'test_writer'
    },
    title : 'test_title',
    content : 'test_content',
    created_at : 'test',
    category : 1
  }];
  console.log(JSON.stringify(data));
  expect(requests).toHaveLength(1);
  requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify(data));
  const html = categoryView.html();
  expect(html.indexOf('test_title')).toBeGreaterThan(-1);
  expect(html.indexOf('test_content')).toBeGreaterThan(-1);
  expect(html.indexOf('test_writer')).toBeGreaterThan(-1);
  expect(html.indexOf('test_writeraaaaa')).toEqual(-1);
});

