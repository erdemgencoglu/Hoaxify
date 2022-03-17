import React, { Component } from 'react';
import { signUp } from '../Api/ApiCalls';

class SignUp extends Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    };

    onChange = event => {
        const { name, value } = event.target;
        const errors = { ...this.state.errors }
        errors[name] = undefined
        this.setState({
            [name]: value,
            errors
        });
    }

    onClickSignUp = async event => {
        //default submit kapatma
        event.preventDefault();
        //
        const { username, displayName, password } = this.state;
        const body = {
            username,
            displayName,
            password
        }
        this.setState({ pendingApiCall: true })

        try {
            const resp = await signUp(body)
            this.setState({ pendingApiCall: false })
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors })
            }
            this.setState({ pendingApiCall: false })
        }
        /*//istek
        signUp(body)
            .then((response) => {
                this.setState({ pendingApiCall: false })
            })
            .catch(error => {
                this.setState({ pendingApiCall: false })
            })*/

    }

    render() {
        const { pendingApiCall, errors } = this.state
        const { username } = errors;
        return (
            <div className='container'>
                <form>
                    <h1 className='text-center'>Sign up</h1>

                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className={username ? "form-control is-invalid" : "form-control"} name='username' onChange={this.onChange}></input>
                        <div className="invalid-feedback">
                            {username}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label>Display Name</label>
                        <input className="form-control" name='displayName' onChange={this.onChange}></input>
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input className="form-control" name='password' onChange={this.onChange} type='password'></input>
                    </div>
                    <div className="mb-3">
                        <label>Password Repeat</label>
                        <input className="form-control" name='passwordRepeat' onChange={this.onChange} type='password'></input>
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-primary' onClick={this.onClickSignUp} disabled={pendingApiCall}>
                            Sign Up
                            {pendingApiCall && <span class="spinner-border spinner-border-sm" ></span>}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;