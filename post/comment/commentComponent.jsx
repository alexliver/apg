import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class CommentComponent extends React.Component {
  componentDidMount() {
  }
  render () {
    var { content, title, loaded , writerName, writerEmail} = this.props
    return (
      <div>
        <TextField
          hintText="Comment"
          floatingLabelText="Comment"
          multiLine={true}
          rows={4}
        /> 
        <RaisedButton label="Submit comment" primary={true}  />
      </div>
    )
  }
}

export default CommentComponent
