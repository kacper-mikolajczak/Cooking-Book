import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import PasswordChangeFormBase from "./PasswordChangeFormBase";

const INIT_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
  msg: null,
};

const PasswordChangePage = (props) => {
  return (
    <div>
      <h1>Change Your password: </h1>
      <PasswordChangeForm />
    </div>
  );
};

class PasswordChangeFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INIT_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({
          ...INIT_STATE,
          msg: "Password has been changed successfully",
        });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const isInvalid =
      this.state.passwordOne === "" || this.state.passwordTwo === "";
    return (
      <PasswordChangeFormBase
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        error={this.state.error}
        isInvalid={isInvalid}
        msg={this.state.msg}
      />
    );
  }
}

const PasswordChangeForm = withFirebase(PasswordChangeFormContainer);

export default PasswordChangePage;

export { PasswordChangeForm };
