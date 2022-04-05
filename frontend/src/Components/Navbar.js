import React, { Component } from 'react';
import logo from "../assets/social.png";
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Authenticaton } from '../shared/AuthenticationContext'
class Navbar extends Component {
    static contextType = Authenticaton;
    render() {
        const { t } = this.props
        //Authenticatin Provider value larına erişme denebilir
        const { state, onLogOutSuccess } = this.context
        const { isLoggedIn, username } = state
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
                        <Link className="nav-link" to="/" onClick={onLogOutSuccess}>  {t('Logout')}</Link>
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
}

export default withTranslation()(Navbar);