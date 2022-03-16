import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null
    };

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    onClickSignUp = event => {
        //default submit kapatma
        event.preventDefault();
        //
        const { username, displayName, password } = this.state;
        const body = {
            username,
            displayName,
            password
        }

        axios.post('/api/1.0/users', body)

    }
    /*onChangeUserName = event => {
        console.log(event.target.value);
        this.setState({
            username: event.target.value
        });
    };

    onChangeDisplayName = event => {
        this.setState({
            displayName: event.target.value
        });
    };
    onChangePassword = event => {
        this.setState({
            password: event.target.value
        });
    };
    onChangePasswordRepat = event => {
        this.setState({
            passwordRepeat: event.target.value
        });
    };*/

    render() {
        return (
            <form>
                <h1>Sign up</h1>
                <div>
                    <label>Username</label>
                    <input name='username' onChange={this.onChange}></input>
                </div>
                <div>
                    <label>Display Name</label>
                    <input name='displayName' onChange={this.onChange}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input name='password' onChange={this.onChange} type='password'></input>
                </div>
                <div>
                    <label>Password Repeat</label>
                    <input name='passwordRepeat' onChange={this.onChange} type='password'></input>
                </div>
                <button onClick={this.onClickSignUp}>Sign Up</button>
            </form>
        );
    }
}

export default SignUp;