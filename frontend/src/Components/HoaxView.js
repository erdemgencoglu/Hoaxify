import React, { useEffect, useState } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js'
import { useTranslation } from 'react-i18next';
const HoaxView = (props) => {
    const { hoax } = props
    const { user, content, timestamp, fileAttachment } = hoax
    const { username, displayName, image } = user
    const { i18n } = useTranslation()
    const timeAgo = format(timestamp, i18n.language)
    return (
        <div className='card p-1 m-1'>
            <div className='d-flex'>
                <ProfileImageWithDefault className='rounded-circle m-1' image={image} width='32' height='32'></ProfileImageWithDefault>
                <div className='flex-fill m-auto ps-2'>
                    <Link className='text-dark' to={`/user/${username}`} style={{ textDecoration: 'none' }} >
                        <h6 className='d-inline'>{displayName}@{username}</h6>
                        <span> - </span>
                        <span>{timeAgo}</span>
                    </Link>
                </div>
            </div>
            <div className='ps-5'>
                {content}
            </div>
            {fileAttachment && (
                <div className='pd-5'>
                    {fileAttachment.fileType.startsWith('image') && (
                        <img className="img-fluid" src={'images/attachments/' + fileAttachment.name} alt={content} />
                    )}
                    {!fileAttachment.fileType.startsWith('image') && (
                        <strong>Hoax has unknown attachment</strong>
                    )}
                </div>
            )}
        </div>
    );
};

export default HoaxView;