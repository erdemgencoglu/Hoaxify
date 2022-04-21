import React, { Component } from 'react';
import logo from "../assets/social.png";
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import { logoutSuccess } from '../redux/AuthActions'

class Navbar extends Component {

    render() {
        const { t, isLoggedIn, username, onLogoutSuccess } = this.props

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
}
const TopBarWithTranslation = withTranslation()(Navbar)
//store dediğimiz index.js de bulunan createStoredaki statetimiz aslında 
const mapStateToProps = store => {
    return {
        isLoggedIn: store.isLoggedIn,
        username: store.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutSuccess: () => {
            return dispatch(logoutSuccess())
        }
    }
}

//Reduxa connect olurken hangi parametreleri alsın demek
export default connect(mapStateToProps, mapDispatchToProps)(TopBarWithTranslation);