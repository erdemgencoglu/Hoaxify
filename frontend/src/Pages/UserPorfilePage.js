import React from 'react';
import { withRouter } from 'react-router-dom'
import ProfileCard from '../Components/ProfileCard'
const UserPorfilePage = (props) => {
    return (
        <div className='container'>
            <ProfileCard username={props.username} />
        </div>
    );
};

export default withRouter(UserPorfilePage);