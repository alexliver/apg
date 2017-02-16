import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class PostContentComponent extends React.Component {
  render () {
    const me = this;

    return (
      <Card>
        <CardHeader title={me.props.writerName} subtitle={me.props.writerTitle} avatar={me.props.writerAvatarURL} />
        <CardTitle title={me.props.title}/>
        <CardText dangerouslySetInnerHTML={{__html: me.props.content}}>
        </CardText>
      </Card>
    )
  }

}

