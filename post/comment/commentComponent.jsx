import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class CommentComponent extends React.Component {
  componentDidMount() {
  }

  handleChange(e) {
    this.props.onChange(this.props.toID, e.target.value);
  }

  handleSubmit() {
    this.props.onSubmit(this.props.toID);
  }

  render () {
    return (
      <div>
        <TextField
          hintText="Comment"
          floatingLabelText="Comment"
          multiLine={true}
          rows={4}
          onChange = {this.handleChange.bind(this)}
        /> 
        <RaisedButton label="Submit comment" primary={true} onClick={this.handleSubmit.bind(this)} />
      </div>
    )
  }
}

export default CommentComponent
