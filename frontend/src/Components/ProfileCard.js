import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Input from '../Components/Input';
import { deleteUser, updateUser } from '../Api/ApiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { logoutSuccess, updateSuccess } from '../redux/AuthActions'
import Modal from './Modal';

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
    const [validationErrors, setValidationErrors] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    const ownedByLoggedInUser = loggedUsername === pathUsername
    const dispatch = useDispatch()
    const history = useHistory();
    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    useEffect(() => {
        setEditable(ownedByLoggedInUser)
    }, [pathUsername, loggedUsername])

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined)
            setNewImage(undefined)
        }
        else
            setUpdatedDisplayName(displayName)
    }, [inEditMode, displayName])

    useEffect(() => {
        setValidationErrors((previousValidationErrors) => {
            return {
                ...previousValidationErrors,
                displayName: undefined
            }
        })
    }, [updatedDisplayName])

    useEffect(() => {
        setValidationErrors((previousValidationErrors) => {
            return {
                ...previousValidationErrors,
                image: undefined
            }
        })
    }, [newImage])

    const onClickSave = async () => {
        let image;
        if (newImage) {
            image = newImage.split(',')[1]
        }
        const body = {
            displayName: updatedDisplayName,
            image: image

        }
        try {
            const response = await updateUser(username, body)
            setInEditMode(false)
            setUser(response.data)
            dispatch(updateSuccess(response.data))
        } catch (error) {
            setValidationErrors(error.response.data.validationErrors)
        }
    }

    const onChangeFile = event => {
        //dosya seçilmemiş ise
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0]
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }
    const onClickCancel = async () => {
        setModalVisible(false)
    }
    const onClickDeleteUser = async () => {
        await deleteUser(username)
        setModalVisible(false)
        dispatch(logoutSuccess())
        history.push('/')
    }
    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username)
    const pendingDeleteAcountApiCall = useApiProgress('delete', `/api/1.0/users/${username}`, true)
    const { displayName: displayNameError, image: imageError } = validationErrors
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
                            {editable &&
                                <>
                                    <button className='btn btn-success d-inline-flex' onClick={() => setInEditMode(true)}> <span className="material-icons ">edit</span>{t('Edit')}
                                    </button>
                                    <div className='mt-2'>
                                        <button className='btn btn-danger d-inline-flex' onClick={() => setModalVisible(true)}>
                                            <span className="material-icons">directions_run</span>
                                            {t('Delete My acount')}
                                        </button>
                                    </div>

                                </>
                            }

                        </>
                    )
                }
                {inEditMode &&
                    (
                        <div>
                            <Input
                                label={t('Change Display Name')}
                                defaultValue={displayName}
                                onChange={(event) => { setUpdatedDisplayName(event.target.value) }}
                                error={displayNameError}>
                            </Input>
                            <Input type="file" onChange={onChangeFile} error={imageError} />
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
            <Modal
                visible={modalVisible}
                onClickCancel={onClickCancel}
                onClickOk={onClickDeleteUser}
                message={t('Are you sure to delete acount?')}
                okButtonTitle={t('Delete My acount')}
                title={t('Acount Delete')}
                pendingApiCall={pendingDeleteAcountApiCall} >
            </Modal >
        </div >
    );
};


export default ProfileCard;