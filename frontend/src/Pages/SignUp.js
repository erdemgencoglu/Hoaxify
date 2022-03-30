import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { signUp } from '../Api/ApiCalls';
import Input from '../Components/Input';
import ButtonWithProgress from '../Components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
//
class SignUp extends Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors: {}
    };

    onChange = event => {
        const { t } = this.props
        const { name, value } = event.target;
        const errors = { ...this.state.errors }
        errors[name] = undefined
        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password mismatch')
            } else if (name === 'passwordRepeat' && value !== this.state.password) {
                errors.passwordRepeat = t('Password mismatch')

            } else {
                errors.passwordRepeat = undefined
            }
        }
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
        try {
            const resp = await signUp(body)
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors })
            }
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
        const { errors } = this.state
        const { username, displayName, password, passwordRepeat } = errors;
        const { t, pendingApiCall } = this.props
        return (
            <div className='container'>
                <form>
                    <h1 className='text-center'>{t('Sign up')}</h1>

                    <Input name="username" label={t('Username')} error={username} onChange={this.onChange}></Input>
                    <Input name="displayName" label={t('Display Name')} error={displayName} onChange={this.onChange}></Input>
                    <Input name="password" label={t('Password')} error={password} onChange={this.onChange} type="password"></Input>
                    <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeat} onChange={this.onChange} type="password"></Input>
                    <div className='text-center'>
                        <ButtonWithProgress
                            onClick={this.onClickSignUp}
                            disabled={pendingApiCall || passwordRepeat !== undefined}
                            pendingApiCall={pendingApiCall}
                            text={t('Sign up')}>
                        </ButtonWithProgress>
                    </div>
                </form >
            </div >
        );
    }
}
const SignUpWithApiProgress = withApiProgress(SignUp, '/api/1.0/users')
const SignUpTranslation = withTranslation()(SignUpWithApiProgress)
export default SignUpTranslation;