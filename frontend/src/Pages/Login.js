import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Input from '../Components/Input';
import ButtonWithProgress from '../Components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import { connect } from 'react-redux'
import { loginHandler } from '../redux/AuthActions';
//
class Login extends Component {
    // static contextType = Authenticaton
    state = {
        username: null,
        password: null,
        error: null
    }
    onChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
            error: null
        })
    }

    onClickLogin = async event => {
        event.preventDefault()

        const { username, password } = this.state;
        const { history, dispatch } = this.props;
        const { push } = history;
        const body = {
            username: username,
            password: password
        }
        this.setState({ error: null })
        try {
            await dispatch(loginHandler(body))
            push("/")
        } catch (apiError) {
            console.log(apiError);
            this.setState({
                error: apiError.response.data.message
            })
        }
    }



    render() {
        const { error, username, password } = this.state
        const { t, pendingApiCall } = this.props //propstan geliyor
        const buttonEnabled = username && password
        return (
            <div className='container'>
                <form>
                    <h1 className='text-center'>{t('Login')}</h1>
                    <Input name="username" label={t('Username')} onChange={this.onChange}></Input>
                    <Input name="password" label={t('Password')} onChange={this.onChange} type="password"></Input>
                    {error && <div className="alert alert-danger" role="alert">
                        {error}
                    </div>}
                    <div className='text-center'>
                        <ButtonWithProgress
                            onClick={this.onClickLogin}
                            disabled={!buttonEnabled || pendingApiCall}
                            pendingApiCall={pendingApiCall}
                            text={t('Login')}>
                        </ButtonWithProgress>
                    </div>

                </form>
            </div>
        );
    }
}

const LoginWithTranslation = withTranslation()(Login)

export default connect()(withApiProgress(LoginWithTranslation, '/api/1.0/auth')) 