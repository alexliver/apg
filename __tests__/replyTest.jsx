import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {mount} from 'enzyme';
import ReplyComponent from '../post/comment/replyComponent.jsx';
import CommentComponent from '../post/comment/commentComponent.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import sinon from 'sinon';
injectTapEventPlugin();

it('toggles reply', () => {
  const writer = {
    username: 'testwriter'
  };

  const data = {
    writer, 
    content: 'test_comment',
    replies: []
  };
  let replyComponent = mount(
    <MuiThemeProvider>
      <ReplyComponent loggedIn={true} commentShow={false} data={data}  />
    </MuiThemeProvider>
  );

  expect(replyComponent.html().indexOf('test_comment')).toBeGreaterThan(-1);
  expect(replyComponent.find('CommentComponent').length).toEqual(0);
  expect(replyComponent.find('div > a').text()).toEqual("Reply");
  
  replyComponent.find('div > a').simulate('click');


  expect(replyComponent.find('CommentComponent').length).toEqual(1);
});

it('replies to comment', () => {
  const writer = {
    username: 'testwriter'
  };

  const data = {
    pk: 1,
    writer, 
    content: 'test',
    replies: []
  };
  const onCommentChangeCallBack = sinon.spy();
  const onCommentSubmitCallBack = sinon.spy();
  let replyComponent = mount(
    <MuiThemeProvider>
      <ReplyComponent loggedIn={true} commentShow={true} data={data} onCommentChange={onCommentChangeCallBack} onCommentSubmit={onCommentSubmitCallBack} />
    </MuiThemeProvider>
  );

  const commentComponent = replyComponent.find('CommentComponent');
  const commentText = commentComponent.find('TextField');
  commentText.prop('onChange')({
    target: {value: 'test_reply'}
  });
  expect(onCommentChangeCallBack.calledOnce).toBeTruthy();
  expect(onCommentChangeCallBack.calledWith(1, 'test_reply')).toBeTruthy();

  const commentSubmitButton = commentComponent.find('RaisedButton');
  commentSubmitButton.prop('onClick')();
  expect(onCommentSubmitCallBack.calledOnce).toBeTruthy();
  expect(onCommentSubmitCallBack.calledWith(1)).toBeTruthy();


});
