import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onLogin() {
    this.props.onLogin(this.state.username, this.state.password);
  }

  onCancel() {
    this.props.onCancel();
  }

  updateUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onLogin.bind(this)}
      />,
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={false}
        onTouchTap={this.onCancel.bind(this)}
      />,
    ];

    return (
      <Dialog
        title="Login"
        actions={actions}
        modal={true}
        open={this.props.open}
        onRequestClose={this.onCancel.bind(this)}
      >
        <TextField
          hintText="User name"
          floatingLabelText="enter user name"
          value={this.state.username}
          onChange={this.updateUsername.bind(this)}
        />
        <TextField
          hintText="Password"
          type="password"
          floatingLabelText="enter password"
          value={this.state.password}
          onChange={this.updatePassword.bind(this)}
        />
      </Dialog>
    );
  }
}
