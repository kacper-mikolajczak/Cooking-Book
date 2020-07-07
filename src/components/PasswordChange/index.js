import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INIT_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

const PasswordChangePage = (props) => {
    
    return (
        <div>
            <h1>Change Your password: </h1>
            <PasswordChangeForm />
        </div>
    )
}

class PasswordChangeFormBase extends Component{
    constructor(props){
        super(props);

        this.state = { ...INIT_STATE };
    }

    onSubmit = event => {
        const { passwordOne } = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({...INIT_STATE});
            })
            .catch(error => {
                this.setState({ error });
            })

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render(){
        const { passwordOne, passwordTwo, error } = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button type="submit" disabled={isInvalid} >Change password</button>
        
                {error && <p>{error.message}</p>}
            </form>
        )
    }
        
}

const PasswordChangeForm = withFirebase(PasswordChangeFormBase);

export default PasswordChangePage;

export { PasswordChangeForm };