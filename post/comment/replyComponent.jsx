import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CommentComponent from './commentComponent.jsx'

class ReplyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.data, {
      loggedInUserID: props.loggedInUserID,
      commentShow: false
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, nextProps.data, {loggedInUserID: nextProps.loggedInUserID}));
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
      <div>
        <CardHeader
          title={writer.username}
          subtitle="pleb"
          avatar={writer.avatar.image}
        />
        <CardText>{state.content}</CardText>
        {state.loggedInUserID?  [
          <a onClick={this.toggleComment.bind(this)}>{state.commentShow? 'Hide reply': 'Reply' }</a>,
          state.commentShow? (<CommentComponent 
            toID={state.pk} 
            onChange={this.onCommentChange.bind(this)} 
            onSubmit={this.onCommentSubmit.bind(this)} 
          />): null
        ]: null}
        {state.replies.map((reply) => (
          <ReplyComponent data={reply} loggedInUserID={state.loggedInUserID} onCommentChange={this.onCommentChange.bind(this)} 
            onCommentSubmit={this.onCommentSubmit.bind(this)} />
        ))}
      </div>
    )
  }
}

export default ReplyComponent

