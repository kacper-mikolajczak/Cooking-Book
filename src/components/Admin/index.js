import React, { Component } from 'react';

import { withFirebase } from "../Firebase";

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
   
      this.props.firebase.users().on('value', snapshot => {
        const usersObject = snapshot.val();
   
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));
   
        this.setState({
          users: usersList,
          loading: false,
        });
      });
      this.props.firebase.data().once('value', snapshot => {
          const dataObj = snapshot.val();

          this.setState({
              data: JSON.stringify(dataObj),
          })
      })
    }  

    componentWillUnmount(){
        this.props.firebase.users().off();
    }

    render(){
        return (
            <div>
                <h1>Admin Dashboard {this.state.data} </h1>
                {this.state.loading && <div>Loading...</div>}

                <UsersList users={this.state.users} />
            </div>
        )
    }
}

const UsersList = ({users}) => {
    return (
        <ul>
            {users.map(user => (
                <li key={user.uid}>
                    <p>
                        <strong>ID:</strong> {user.uid}
                    </p>
                    <p>
                        <strong>E-Mail:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Username:</strong> {user.username}
                    </p>
                </li>
            ))}
        </ul>
    )
}

export default withFirebase(AdminPage);