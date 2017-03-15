import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {mount} from 'enzyme';
import sinon from 'sinon';
import PostView from '../post/postView.jsx';
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


it('loads post', () => {
  const params = {postID: 1};
  let postView = mount(
    <MuiThemeProvider>
      <PostView  params={params} />
    </MuiThemeProvider>
  );

  const post = {
    replies: [{
      writer: {
        username: 'test_reply_writer',
        is_superuser: true,
        avatar: {
          image: 'http://image-url.com'
        }
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
  };
  requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify(post));
  expect(1).toEqual(1);
  const html = postView.html();
  expect(html.indexOf('test_title')).toBeGreaterThan(-1);
  expect(html.indexOf('test_content')).toBeGreaterThan(-1);
  expect(html.indexOf('test_writer')).toBeGreaterThan(-1);
  expect(html.indexOf('test_reply_writer')).toBeGreaterThan(-1);
  expect(html.indexOf('test_reply_content')).toBeGreaterThan(-1);
  expect(html.indexOf('the supreme leader')).toBeGreaterThan(-1);
  expect(html.indexOf('http://image-url.com')).toBeGreaterThan(-1);
  expect(html.indexOf('test_writeraaaaa')).toEqual(-1);
});

it('replies to post', () => {
  const params = {postID: 1};
  let postView = mount(
    <MuiThemeProvider>
      <PostView  params={params} />
    </MuiThemeProvider>
  );

  const post = {
    replies: [],
    pk: 1,
    writer : {
      username: 'test_writer'
    },
    title : 'test_title',
    content : 'test_content',
    created_at : 'test',
    category : 1
  };

  requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify(post));

  globalActions.loggedIn();
  const commentComponent = postView.find('CommentComponent');
  const commentText = commentComponent.find('TextField');
  commentText.prop('onChange')({
    target: {value: 'test_reply'}
  });
  const commentSubmitButton = commentComponent.find('RaisedButton');
  commentSubmitButton.prop('onClick')();
  expect(requests).toHaveLength(2);

  expect(requests[1].requestBody.indexOf('test_reply')).toBeGreaterThan(-1);
  requests[1].respond(200, {"Content-Type": "application/json"}, JSON.stringify({}));
  expect(requests).toHaveLength(3);

  const newPost = Object.assign({}, post, { replies: [{
    writer: {
      username: 'test_reply_writer'
    }, 
    content: 'test_reply_content',
    replies: []
  }]});

  requests[2].respond(200, {"Content-Type": "application/json"}, JSON.stringify(newPost));
  expect(postView.html().indexOf('test_reply_writer')).toBeGreaterThan(-1);
  expect(postView.html().indexOf('test_reply_content')).toBeGreaterThan(-1);
});
