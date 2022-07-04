import React from 'react';
import defaultPictue from '../assets/profile.jpg'

const ProfileImageWithDefault = props => {
    const { image, tempimage } = props
    let imageSource = defaultPictue;
    if (image) {
        imageSource = 'images/profile/' + image
    }
    return (
        <img alt={'Profile'} src={tempimage || imageSource}{...props} onError={(event) => {
            event.target.src = defaultPictue
        }}></img>
    );
};

export default ProfileImageWithDefault;