import React, { useEffect, useState } from 'react';
import { withRouter, useParams } from 'react-router-dom'
import ProfileCard from '../Components/ProfileCard'
import { getUser } from '../Api/ApiCalls';
const UserPorfilePage = (props) => {
    const [user, setUser] = useState()
    const { username } = useParams()
    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username)
                setUser(response.data)
            } catch (error) {
            }
        }
        loadUser()
    }, [username])//her username değiştiğinde çalışssın


    return (
        <div className='container'>
            <ProfileCard />
        </div>
    );
};

export default withRouter(UserPorfilePage);