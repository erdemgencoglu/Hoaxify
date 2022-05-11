import React from 'react';
import defaultPictue from '../assets/profile.jpg'
import { Link } from 'react-router-dom'
const UserListItem = (props) => {
    const { user } = props
    const { username, displayName, image } = user
    let imageSource = defaultPictue
    if (image) {
        imageSource = image
    }
    return (
        <Link className='list-group-item list-group-item-action' to={`/user/${user.username}`}>
            <img className='rounded-circle' alt={`${username} profile`} src={imageSource} width="32" height="32" />
            <span className='pl-2'>
                {displayName}@{username}
            </span>
        </Link>
    );
};

export default UserListItem;