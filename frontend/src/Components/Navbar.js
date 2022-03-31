import React, { Component } from 'react';
import logo from "../assets/social.png";
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
class Navbar extends Component {
    render() {
        const { t } = this.props
        return (
            <div className='shadow-sm bg-light mb-2'>

                <nav className="navbar navbar-light navbar-expand container">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} width="60" alt='Hoaxify Logo' style={{ paddingRight: 10 }} />Hoaxify
                        </Link>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/login">{t('Login')}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">{t('Sign up')}</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withTranslation()(Navbar);