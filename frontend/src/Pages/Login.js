import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { login } from '../Api/ApiCalls';
import Input from '../Components/Input';
class Login extends Component {
    state = {
        username: null,
        password: null,
        pendingApiCall: null,
        errors: {}
    }

    onChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    onClickLogin = async event => {
        event.preventDefault()
        const { username, password } = this.state;
        const body = {
            username: username,
            password: password
        }
        this.setState({ pendingApiCall: true })
        try {
            const resp = await login(body)
            this.setState({ pendingApiCall: false })
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors })
            }
            this.setState({ pendingApiCall: false })
        }
    }

    render() {
        const { pendingApiCall, errors } = this.state
        const { username, password } = errors;
        const { t } = this.props
        return (
            <div className='container'>
                <form>
                    <h1 className='text-center'>{t('Login')}</h1>
                    <Input name="username" label={t('Username')} error={username} onChange={this.onChange}></Input>
                    <Input name="password" label={t('Password')} error={password} onChange={this.onChange} type="password"></Input>
                    <div className='text-center'>
                        <button className='btn btn-primary' onClick={this.onClickLogin} disabled={pendingApiCall}>
                            {t('Login')}
                            {pendingApiCall && <span class="spinner-border spinner-border-sm" ></span>}
                        </button>
                    </div>

                </form>
            </div>
        );
    }
}

const LoginTranslation = withTranslation()(Login)
export default LoginTranslation;