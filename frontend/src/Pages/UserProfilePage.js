import React, { useEffect, useState } from 'react';
import { withRouter, useParams } from 'react-router-dom'
import ProfileCard from '../Components/ProfileCard'
import { getUser } from '../Api/ApiCalls';
import { useApiProgress } from '../shared/ApiProgress'
import Spinner from '../Components/Spinner';

import { useTranslation } from 'react-i18next';
const UserProfilePage = (props) => {
    const [user, setUser] = useState({})
    const [notFound, setNotFound] = useState(false)
    const { username } = useParams()
    const { t } = useTranslation()
    const pendingApiCall = useApiProgress('get', '/api/1.0/users/' + username)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username)
                setUser(response.data)
                setNotFound(false)
            } catch (error) {
                setNotFound(true)
            }
        }
        loadUser()
    }, [username])//her username değiştiğinde çalışssın

    if (pendingApiCall) {
        return (
            <Spinner></Spinner>
        )
    }
    if (notFound) {
        return (
            <div className='container'>
                <div className="alert alert-danger text-center" role="alert">
                    <div>
                        <span className="material-icons" style={{ fontSize: 48 }}>error</span>
                    </div>
                    {t('User not found')}
                </div>
            </div>

        )
    }

    return (
        <div className='container'>
            <ProfileCard user={user} />
        </div>
    );
};

export default withRouter(UserProfilePage);