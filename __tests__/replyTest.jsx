import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {mount} from 'enzyme';
import ReplyComponent from '../post/comment/replyComponent.jsx';
import CommentComponent from '../post/comment/commentComponent.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('toggles reply', () => {
  const writer = {
    username: 'testwriter'
  };

  const data = {
    writer, 
    content: 'test',
    replies: []
  };
  let replyComponent = mount(
    <MuiThemeProvider>
      <ReplyComponent loggedIn={true} commentShow={false} data={data}  />
    </MuiThemeProvider>
  );

  expect(replyComponent.find('CommentComponent').length).toEqual(0);
  expect(replyComponent.find('div > a').text()).toEqual("Reply");
  
  replyComponent.find('div > a').simulate('click');


  expect(replyComponent.find('CommentComponent').length).toEqual(1);
});
