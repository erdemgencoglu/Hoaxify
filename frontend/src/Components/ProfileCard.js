import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Input from '../Components/Input';
import { updateUser } from '../Api/ApiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import ProfileImageWithDefault from './ProfileImageWithDefault';
const ProfileCard = (props) => {
    const [user, setUser] = useState({})
    const [inEditMode, setInEditMode] = useState(false)
    const [updatedDisplayName, setUpdatedDisplayName] = useState()
    const { username: loggedUsername } = useSelector((store) => { return { username: store.username } })
    const routeParams = useParams();
    const { t } = useTranslation()
    const pathUsername = routeParams.username
    const { username, displayName, image } = user
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState()

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    useEffect(() => {
        setEditable(loggedUsername === pathUsername)
    }, [pathUsername, loggedUsername])

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined)
            setNewImage(undefined)
        }
        else
            setUpdatedDisplayName(displayName)
    }, [inEditMode, displayName])

    const onClickSave = async () => {
        const body = {
            displayName: updatedDisplayName,
            image: newImage.split(',')[1]

        }
        try {
            const response = await updateUser(username, body)
            setInEditMode(false)
            setUser(response.data)
        } catch (error) {

        }
    }

    const onChangeFile = event => {
        const file = event.target.files[0]
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }
    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username)

    return (
        <div className="card" style={{ marginBottom: 5 }}>
            <div className='text-center'>
                <ProfileImageWithDefault
                    className='rounded-circle shadow'
                    width="128" height="128"
                    alt={`${username} profile`}
                    image={image}
                    tempimage={newImage}
                />
            </div>
            <div className="card-body text-center">
                {!inEditMode &&
                    (
                        <>
                            <h5 className="card-title">{displayName}@{username}</h5>
                            <p className="card-text"></p>
                            {editable && <button className='btn btn-success d-inline-flex' onClick={() => setInEditMode(true)}> <span className="material-icons ">edit</span>{t('Edit')}</button>}
                        </>
                    )
                }
                {inEditMode &&
                    (
                        <div>
                            <Input label={t('Change Display Name')} defaultValue={displayName} onChange={(event) => { setUpdatedDisplayName(event.target.value) }}></Input>
                            <input type="file" onChange={onChangeFile} />
                            <div className=' d-inline-flex'>
                                <ButtonWithProgress
                                    className='btn btn-primary  d-inline-flex'
                                    onClick={onClickSave}
                                    disabled={pendingApiCall}
                                    pendingApiCall={pendingApiCall}
                                    text={
                                        <>
                                            <span className="material-icons ">save</span>{t('Save')}
                                        </>
                                    }
                                />
                                <button
                                    className='btn btn-light  d-inline-flex ms-2'
                                    onClick={() => setInEditMode(false)
                                    }
                                    disabled={pendingApiCall}
                                ><span className="material-icons ">close</span>{t('Cancel')}</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};


export default ProfileCard;