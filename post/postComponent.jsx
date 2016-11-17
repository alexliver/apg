import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import actions from './postActions.jsx'

class PostComponent extends React.Component {
  componentDidMount() {
    let postID = this.props.postID;
    this.props.dispatch(actions.loadPost(postID))
  }
  render () {
    var { content, title, loaded , writerName, writerEmail} = this.props

    return (
      <Card>
        <CardHeader title={writerName} subtitle={writerEmail} />
        <CardTitle title={title}/>
        <CardText>{content}</CardText>
      </Card>
    )
  }
}

const mapStateToProps = (state, props) => {
  let post = state.post;
  let writer = post.writer;
  var writerName = "N/A";
  var writerEmail = "N/A";
  if (writer) {
    writerName = writer.username;
    writerEmail = writer.email;
  }

  return {
    title: post.title,
    content: post.content,
    loaded: state.loaded,
    writerName: writerName,
    writerEmail: writerEmail
  }
}

const ConnectedPostComponent = connect(mapStateToProps)(PostComponent)

export default ConnectedPostComponent
