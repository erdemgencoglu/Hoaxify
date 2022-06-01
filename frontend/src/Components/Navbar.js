import React, { useEffect, useState, useRef } from 'react';
import logo from "../assets/social.png";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess } from '../redux/AuthActions'
import ProfileImageWithDefault from './ProfileImageWithDefault';

const Navbar = (props) => {
    const { t } = useTranslation();
    const { isLoggedIn, username, displayName, image } = useSelector((store) => {
        return {
            isLoggedIn: store.isLoggedIn,
            username: store.username,
            displayName: store.displayName,
            image: store.image
        }
    })
    const [menuVisible, setMenuVisible] = useState(false)
    const dispatch = useDispatch();
    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    }
    const menuArea = useRef(null)

    useEffect(() => {
        document.addEventListener('click', menuClickTracker)
        return () => {
            document.removeEventListener('click', menuClickTracker)
        }
    }, [isLoggedIn])

    const menuClickTracker = (event) => {
        if (menuArea.current === null || !menuArea.current.contains(event.target))
            setMenuVisible(false)
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
        let dropDownClass = 'dropdown-menu p-0 shadow'
        if (menuVisible) {
            dropDownClass += ' show'
        }
        links = (
            <ul className="navbar-nav ml-auto" ref={menuArea}>
                <li className='nav-item dropdown'>
                    <div className='d-flex' style={{ cursor: 'pointer' }} onClick={() => setMenuVisible(true)}>
                        <ProfileImageWithDefault image={image} width='32' height='32' className="rounded-circle m-auto"></ProfileImageWithDefault>
                        <span className="nav-link dropdown-toggle">{displayName}</span>
                    </div>
                    <div className={dropDownClass} aria-labelledby="navbarDropdownMenuLink">
                        <span className="nav-item">
                            <Link className="dropdown-item d-flex p-2" to={`/user/${username}`} onClick={() => setMenuVisible(false)}>
                                <span className="material-icons text-info mr-4">
                                    person
                                </span>
                                {t('My Profile')}
                            </Link>
                        </span>
                        <span className="nav-item">
                            <Link className="dropdown-item d-flex p-2" to="/" onClick={onLogoutSuccess}>
                                <span className="material-icons text-danger mr-4">
                                    logout
                                </span>
                                {t('Logout')}</Link>
                        </span>
                    </div>
                </li>
            </ul>
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