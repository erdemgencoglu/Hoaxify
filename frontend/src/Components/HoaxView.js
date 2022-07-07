import React, { useEffect, useState } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import { deleteHoax } from '../Api/ApiCalls';
import Modal from './Modal';
import { useApiProgress } from '../shared/ApiProgress';

const HoaxView = (props) => {
    const loggedInUser = useSelector(store => store.username)
    const { hoax, onDeleteHoax } = props
    const { user, content, timestamp, fileAttachment, id } = hoax
    const { username, displayName, image } = user
    const { i18n, t } = useTranslation()
    const timeAgo = format(timestamp, i18n.language)
    const ownedByLoggedInUser = loggedInUser === username
    const [modalVisible, setModalVisible] = useState(false)
    const pendingApiCall = useApiProgress('delete', `/api/1.0/hoaxes/${id}`, true)
    const onClickDelete = async () => {
        await deleteHoax(id)
        onDeleteHoax(id)
    }

    const onClickCancel = async () => {
        setModalVisible(false)
    }
    return (
        <>
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
                    {ownedByLoggedInUser &&
                        (<button className='btn btn-delete-link btn-sm shadow-none' onClick={() => setModalVisible(true)}>
                            <span className="material-icons">delete_outline</span>
                        </button>)}
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
            <Modal
                visible={modalVisible}
                onClickCancel={onClickCancel}
                onClickOk={onClickDelete}
                title={t('Delete Hoax')}
                okButtonTitle={t('Delete Hoax')}
                message={
                    <div>
                        <div>
                            <strong>{t('Are you sure to delete Hoax?')}</strong>
                        </div>
                        <span>{content}</span>
                    </div>

                }
                pendingApiCall={pendingApiCall}>
            </Modal>
        </>

    );
};

export default HoaxView;