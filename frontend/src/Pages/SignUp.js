import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { signUp, changeLanguage } from '../Api/ApiCalls';
import Input from '../Components/Input';
import i18n from '../i18next';

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
    onChangeLanguage = (language) => {
        const { i18n } = this.props;
        i18n.changeLanguage(language)
        changeLanguage(language)
    }
    render() {
        const { pendingApiCall, errors } = this.state
        const { username, displayName, password, passwordRepeat } = errors;
        const { t } = this.props
        return (
            <div className='container'>
                <form>
                    <h1 className='text-center'>{t('Sign up')}</h1>

                    <Input name="username" label={t('Username')} error={username} onChange={this.onChange}></Input>
                    <Input name="displayName" label={t('Display Name')} error={displayName} onChange={this.onChange}></Input>
                    <Input name="password" label={t('Password')} error={password} onChange={this.onChange} type="password"></Input>
                    <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeat} onChange={this.onChange} type="password"></Input>
                    <div className='text-center'>
                        <button className='btn btn-primary' onClick={this.onClickSignUp} disabled={pendingApiCall || passwordRepeat}>
                            {t('Sign up')}
                            {pendingApiCall && <span class="spinner-border spinner-border-sm" ></span>}
                        </button>
                    </div>
                    <div>
                        <img src='https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-250.png' alt="en" width={27} style={{ cursor: 'pointer' }} onClick={() => this.onChangeLanguage('en')} />
                        <img src='https://cdn.countryflags.com/thumbs/turkey/flag-square-250.png' alt="tr" width={27} style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => this.onChangeLanguage('tr')} />
                    </div>
                </form>
            </div>
        );
    }
}
const SignUpTranslation = withTranslation()(SignUp)
export default SignUpTranslation;