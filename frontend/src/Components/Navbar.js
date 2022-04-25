import React from 'react';
import logo from "../assets/social.png";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess } from '../redux/AuthActions'

const Navbar = (props) => {
    const { t } = useTranslation();
    const { isLoggedIn, username } = useSelector((store) => {
        return {
            isLoggedIn: store.isLoggedIn,
            username: store.username
        }
    })
    const dispatch = useDispatch();
    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    }
    let links = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">{t('Login')}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">{t('Sign up')}</Link>
            </li>
        </ul>
    );
    if (isLoggedIn) {
        links = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={`/user/${username}`}>  {username}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={onLogoutSuccess}>  {t('Logout')}</Link>
                </li>
            </ul >
        )
    }
    return (
        <div className='shadow-sm bg-light mb-2'>

            <nav className="navbar navbar-light navbar-expand container">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="60" alt='Hoaxify Logo' style={{ paddingRight: 10 }} />Hoaxify
                    </Link>
                    {links}
                </div>
            </nav>
        </div>
    );
}

//Reduxa connect olurken hangi parametreleri alsın demek
export default (Navbar);