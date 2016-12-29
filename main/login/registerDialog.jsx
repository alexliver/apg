import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class RegisterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      usernameError: '',
      passwordError: '',
      confirmPasswordError: ''
    };
  }

  onRegister() {
    const requiredText = "This field is required";
    let errorState = {};
    let foundError = false;
    if (this.state.username.length == 0) {
      errorState.usernameError = requiredText;
      foundError = true;
    } else {
      errorState.usernameError = "";
    }

    if (this.state.password.length == 0) {
      errorState.passwordError = requiredText;
      foundError = true;
    } else {
      errorState.passwordError = "";
    }
    if (this.state.password != this.state.confirmPassword) {
      errorState.confirmPasswordError = "Password confirmation incorrect";
      foundError = true;
    } else {
      errorState.confirmPasswordError = "";
    }

    this.setState(errorState);
    if (!foundError)
      this.props.onRegister(this.state.username, this.state.password);
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

  updateConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onRegister.bind(this)}
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
        title="Register"
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
          errorText={this.state.usernameError}
        />
        <TextField
          hintText="Password"
          type="password"
          floatingLabelText="enter password"
          value={this.state.password}
          onChange={this.updatePassword.bind(this)}
          errorText={this.state.passwordError}
        />
        <TextField
          hintText="Confirm Password"
          type="Confirm password"
          floatingLabelText="repeat password"
          value={this.state.confirmPassword}
          onChange={this.updateConfirmPassword.bind(this)}
          errorText={this.state.confirmPasswordError}
        />
      </Dialog>
    );
  }
}

