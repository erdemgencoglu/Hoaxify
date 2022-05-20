import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import defaultPictue from '../assets/profile.jpg'
import { useTranslation } from 'react-i18next';
import Input from '../Components/Input';
const ProfileCard = (props) => {
    const [inEditMode, setInEditMode] = useState(false)
    const { username: loggedUsername } = useSelector((store) => { return { username: store.username } })
    const routeParams = useParams();
    const pathUsername = routeParams.username
    const { user } = props;
    const { username, displayName, image } = user
    const { t } = useTranslation()
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
                {!inEditMode &&
                    (
                        <>
                            <h5 className="card-title">{displayName}@{username}</h5>
                            <p className="card-text"></p>
                            <button className='btn btn-success d-inline-flex' onClick={() => setInEditMode(true)}> <span className="material-icons ">edit</span>{t('Edit')}</button>
                        </>
                    )
                }
                {inEditMode &&
                    (
                        <div>
                            <Input label={t('Change Display Name')} defaultValue={displayName}></Input>
                            <div>
                                <button className='btn btn-primary  d-inline-flex'> <span className="material-icons ">save</span>{t('Save')}</button>
                                <button className='btn btn-light  d-inline-flex ms-2' onClick={() => setInEditMode(false)}><span className="material-icons ">close</span>{t('Cancel')}</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};


export default ProfileCard;