import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import actions from './postActions.jsx'
import CommentComponent from './comment/commentComponent.jsx'
import ReplyComponent from './comment/replyComponent.jsx'

class PostComponent extends React.Component {
  componentDidMount() {
    let postID = this.props.postID;
    this.props.dispatch(actions.loadPost(postID))
  }

  render () {
    const me = this;
    var { content, title, loaded , writerName, writerEmail} = this.props

    return (
      <div>
        <Card>
          <CardHeader title={writerName} subtitle="The Supreme Leader" avatar={this.props.writerAvatarURL} />
          <CardTitle title={title}/>
          <CardText>{content}</CardText>
        </Card>
        {this.props.replies.map(function(reply, i){
          return <ReplyComponent data={reply} onCommentChange={me.onCommentChange.bind(me)} 
            onCommentSubmit={me.onCommentSubmit.bind(me)} loggedInUserID= {me.props.loggedInUserID} />;
        })} 
        { this.props.loggedInUserID ? <CommentComponent 
          toID={this.props.postID} 
          onChange={this.onCommentChange.bind(this)} 
          onSubmit={this.onCommentSubmit.bind(this)} 
        />: null}
      </div>
    )
  }

  onCommentChange(repliableID, text) {
    this.props.dispatch(actions.editComment(repliableID, text));
  }

  onCommentSubmit(repliableID) {
    this.props.dispatch(actions.submitComment(repliableID));
  }
}

const mapStateToProps = (state, props) => {
  let post = state.post;
  let writer = post.writer;
  var writerName = "N/A";
  var writerEmail = "N/A";
  var writerAvatarURL = "#";
  if (writer) {
    writerName = writer.username;
    writerEmail = writer.email;
    if (writer.avatar)
      writerAvatarURL = writer.avatar.image;
  }

  return {
    title: post.title,
    content: post.content,
    loaded: state.loaded,
    writerName: writerName,
    writerEmail: writerEmail,
    writerAvatarURL,
    loggedInUserID: state.loggedInUserID,
    replies: state.replies
  }
}

const ConnectedPostComponent = connect(mapStateToProps)(PostComponent)

export default ConnectedPostComponent
