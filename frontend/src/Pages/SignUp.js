import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { signUp } from '../Api/ApiCalls';
import Input from '../Components/Input';
import ButtonWithProgress from '../Components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { signUpHandler } from '../redux/AuthActions';
//
const SignUp = (props) => {
    const [form, setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null
    })
    //Hooks
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    //
    const onChange = event => {
        const { t } = props
        const { name, value } = event.target;
        const errorsCopy = { ...errors }
        errorsCopy[name] = undefined
        setErrors(errorsCopy)
        setForm((previousForm) => ({ ...previousForm, [name]: value }));
    }

    const onClickSignUp = async event => {
        //default submit kapatma
        event.preventDefault();
        //
        const { history } = props;
        const { push } = history;
        const { username, displayName, password } = form;
        const body = {
            username,
            displayName,
            password
        }
        try {
            await dispatch(signUpHandler(body))
            push("/")
            /////
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
            }
        }
    }
    const { t } = useTranslation();
    const { username: userNameError, displayName: displayNameError, password: passwordError } = errors;
    const { pendingApiCall } = props

    let passwordRepeatError
    if (form.password !== form.passwordRepeat) {
        passwordRepeatError = t('Password mismatch')
    }
    return (
        <div className='container'>
            <form>
                <h1 className='text-center'>{t('Sign up')}</h1>

                <Input name="username" label={t('Username')} error={userNameError} onChange={onChange}></Input>
                <Input name="displayName" label={t('Display Name')} error={displayNameError} onChange={onChange}></Input>
                <Input name="password" label={t('Password')} error={passwordError} onChange={onChange} type="password"></Input>
                <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeatError} onChange={onChange} type="password"></Input>
                <div className='text-center'>
                    <ButtonWithProgress
                        onClick={onClickSignUp}
                        disabled={pendingApiCall || passwordRepeatError !== undefined}
                        pendingApiCall={pendingApiCall}
                        text={t('Sign up')}>
                    </ButtonWithProgress>
                </div>
            </form >
        </div >
    );
}
const SignUpWithApiProgress = withApiProgress(SignUp, '/api/1.0/users')
const SignUpWithApiProgressAuthRequest = withApiProgress(SignUpWithApiProgress, '/api/1.0/auth')
export default SignUpWithApiProgressAuthRequest;