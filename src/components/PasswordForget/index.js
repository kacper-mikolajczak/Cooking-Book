import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = (props) => {
    
    return (
        <div>
            <h1>Verification email: </h1>
            <PasswordForgetForm />
        </div>
    )
}

const INIT_STATE = {
    email: "",
    error: null,
    msg: null,
}

class PasswordForgetFormBase extends Component{
    constructor(props){
        super(props);

        this.state = { ...INIT_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INIT_STATE, msg: "Verification email has been sent" });
            })
            .catch(error => {
                this.setState({ error });
            })
        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    }

    render(){
        const { email, error, msg } = this.state;
    
        const isInvalid = email === '';
    
        return (
        <form onSubmit={this.onSubmit}>
            <input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
            />
            <button disabled={isInvalid} type="submit">
            Reset My Password
            </button>
    
            {error && <p style={{color: 'red'}}>{error.message}</p>}
            {msg && <p>{msg}</p>}
        </form>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
)


export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink};