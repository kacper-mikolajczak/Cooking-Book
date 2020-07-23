import React, { Component } from "react";

import { withFirebase } from "../../Firebase";

import { withAuthorization, AuthUserContext } from "../Session";

import { Button } from "@material-ui/core";

import CenterMsg from "../CenterMsg";
import UserTable from "./UserTable";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      data: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .users()
      .get()
      .then((dbRes) => {
        const usersList = dbRes.docs.map((doc) => doc.data());
        this.setState({
          users: usersList,
          loading: false,
        });
      });
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            <CenterMsg variant="h4" msg="Admin Dashboard" gutter={20} />
            {this.state.loading && <div>Loading...</div>}

            <UserTable users={this.state.users} />
            {/* <UsersList users={this.state.users} /> */}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const UsersList = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.uid} style={{ margin: "10px" }}>
          <span>
            <strong>Name:</strong> {user.lastName} {user.firstName}
          </span>
          <Button
            color="secondary"
            variant="outlined"
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
};

const condition = (authUser) => authUser !== null;

export default withAuthorization(condition)(withFirebase(AdminPage));
