import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import actions from './postActions.jsx'
import CommentComponent from './comment/commentComponent.jsx'
import ReplyComponent from './comment/replyComponent.jsx'
import PostContentComponent from './postContentComponent.jsx'
import {mainActions} from '../globalRedux.jsx'
import {getUserTitle, getUserAvatar} from './postUtil.jsx'

class PostComponent extends React.Component {
  componentDidMount() {
    let postID = this.props.postID;
    this.props.dispatch(mainActions.setIsRoot(false));
    this.props.dispatch(actions.firstLoadPost(postID));
  }

  render () {
    const me = this;
    var { content, title, loaded , writerName, writerEmail, created_at, writerTitle} = this.props

    return (
      <div>
        <PostContentComponent writerName={writerName} writerTitle={writerTitle} writerAvatarURL={this.props.writerAvatarURL}
            title={title} content={content} created_at={created_at} />
        {this.props.replies.map(function(reply, i){
          return <ReplyComponent data={reply} onCommentChange={me.onCommentChange.bind(me)} 
            onCommentSubmit={me.onCommentSubmit.bind(me)} loggedIn= {me.props.loggedIn} />;
        })} 
        { this.props.loggedIn ? <CommentComponent 
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
  let writerTitle = "";
  if (writer) {
    writerName = writer.username;
    writerAvatarURL = getUserAvatar(writer);
    writerTitle = getUserTitle(writer);
  }

  return {
    title: post.title,
    content: post.content,
    created_at: post.created_at,
    loaded: state.loaded,
    writerName: writerName,
    writerAvatarURL,
    loggedIn: state.loggedIn,
    replies: state.replies,
    writerTitle,
  }
}

const ConnectedPostComponent = connect(mapStateToProps)(PostComponent)

export default ConnectedPostComponent
