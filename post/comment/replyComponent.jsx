import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CommentComponent from './commentComponent.jsx'
import Avatar from 'material-ui/Avatar';
import {getUserTitle, getUserAvatar} from '../postUtil.jsx'

class ReplyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.data, {
      loggedIn: props.loggedIn,
      commentShow: props.commentShow
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, nextProps.data, {loggedIn: nextProps.loggedIn}));
  }

  toggleComment() {
    this.setState({commentShow: !this.state.commentShow});
  }

  onCommentChange(toID, value) {
    this.props.onCommentChange(toID, value);
  }

  onCommentSubmit(toID) {
    this.props.onCommentSubmit(toID);
  }

  render () {
    let state = this.state;
    let writer = state.writer?state.writer:{};
    return (
      <div style={{paddingLeft: '5px'}}>
        <CardHeader
          title={writer.username}
          subtitle={getUserTitle(writer)}
          avatar={getUserAvatar(writer)}
        />
        <CardText>{state.content}</CardText>
        {state.loggedIn?  [
          <a onClick={this.toggleComment.bind(this)}>{state.commentShow? 'Hide reply': 'Reply' }</a>,
          state.commentShow? (<CommentComponent 
            toID={state.pk} 
            onChange={this.onCommentChange.bind(this)} 
            onSubmit={this.onCommentSubmit.bind(this)} 
          />): null
        ]: null}
        {state.replies.map((reply) => (
          <ReplyComponent data={reply} loggedIn={state.loggedIn} onCommentChange={this.onCommentChange.bind(this)} 
            onCommentSubmit={this.onCommentSubmit.bind(this)} />
        ))}
      </div>
    )
  }
}

export default ReplyComponent

