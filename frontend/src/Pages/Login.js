import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../Components/Input';
import ButtonWithProgress from '../Components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux'
import { loginHandler } from '../redux/AuthActions';
//
const Login = (props) => {
    //Hooks
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const dispatch = useDispatch();
    //
    useEffect(() => {
        setError(undefined)
    }, [username, password])//username ve passworda değişiklik olursa setError()
    //
    const onClickLogin = async event => {
        event.preventDefault()
        const body = {
            username: username,
            password: password
        }
        //
        const { history } = props;
        const { push } = history;
        setError(undefined)
        try {
            await dispatch(loginHandler(body))
            push("/")
        } catch (apiError) {
            console.log(apiError);
            setError(apiError.response.data.message);
        }
    }

    const { t } = useTranslation();
    const { pendingApiCall } = props //propstan geliyor
    const buttonEnabled = username && password
    return (
        <div className='container'>
            <form>
                <h1 className='text-center'>{t('Login')}</h1>
                <Input label={t('Username')} onChange={(event) => setUsername(event.target.value)}></Input>
                <Input label={t('Password')} type="password" onChange={(event) => setPassword(event.target.value)}></Input>
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <div className='text-center'>
                    <ButtonWithProgress
                        onClick={onClickLogin}
                        disabled={!buttonEnabled || pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        text={t('Login')}>
                    </ButtonWithProgress>
                </div>

            </form>
        </div>
    );
}

export default withApiProgress(Login, '/api/1.0/auth')