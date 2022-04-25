import React from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ProfileCard = (props) => {
    const { username: loggedUsername } = useSelector((store) => {
        return {
            username: store.username
        }
    })
    const routeParams = useParams();
    const pathUsername = routeParams.username
    let message = "We can not edit"
    if (loggedUsername === pathUsername) {
        message = "We can edit"
    }
    return (
        <div>
            {message}
        </div>
    );
};


export default ProfileCard;