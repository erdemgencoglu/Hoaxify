import React from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import defaultPictue from '../assets/profile.jpg'
const ProfileCard = (props) => {
    const { username: loggedUsername } = useSelector((store) => { return { username: store.username } })
    const routeParams = useParams();
    const pathUsername = routeParams.username

    const { user } = props;
    const { username, displayName, image } = user
    let message = "We can not edit"
    if (loggedUsername === pathUsername) {
        message = "We can edit"
    }
    let imageSource = defaultPictue
    if (image) {
        imageSource = image
    }
    return (
        <div className="card" style={{ marginBottom: 5 }}>
            <div className='text-center'>
                <img className='rounded-circle shadow' alt={`${username} profile`} src={imageSource} width="128" height="128" />
            </div>
            <div className="card-body text-center">
                <h5 className="card-title">{displayName}@{username}</h5>
                <p className="card-text"></p>
            </div>
        </div>
    );
};


export default ProfileCard;