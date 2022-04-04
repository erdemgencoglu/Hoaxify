import React from 'react';
import { withRouter } from 'react-router-dom'
import ProfileCard from '../Components/ProfileCard'
const UserPorfilePage = () => {
    return (
        <div className='container'>
            <ProfileCard />
        </div>
    );
};

export default withRouter(UserPorfilePage);