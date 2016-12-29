import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CommentComponent from './commentComponent.jsx'
import Avatar from 'material-ui/Avatar';

class ReplyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.data, {
      loggedIn: props.loggedIn,
      commentShow: false
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
    let avatar = <Avatar>{writer.username[0]}</Avatar>;
    if (writer.avatar)
      avatar = writer.avatar.image;
    return (
      <div>
        <CardHeader
          title={writer.username}
          subtitle="pleb"
          avatar={avatar}
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

