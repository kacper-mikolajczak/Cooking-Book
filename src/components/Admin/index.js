import React, { Component } from "react";

import { withFirebase } from "../../Firebase";

import { withAuthorization, AuthUserContext } from "../Session";

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
            <h1>Admin Dashboard {this.state.data} </h1>
            {this.state.loading && <div>Loading...</div>}

            <UsersList users={this.state.users} />
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
        <li key={user.uid}>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>E-Mail:</strong> {user.email}
          </p>
          <p>
            <strong>Name:</strong> {user.lastName} {user.firstName}
          </p>
        </li>
      ))}
    </ul>
  );
};

const condition = (authUser) => authUser !== null;

export default withAuthorization(condition)(withFirebase(AdminPage));
