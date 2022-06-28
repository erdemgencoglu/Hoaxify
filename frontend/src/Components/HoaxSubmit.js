import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { postHoax, postHoaxAttachment } from '../Api/ApiCalls';
import ButtonWithProgress from './ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import Input from './Input';
import AutoUploadImage from './AutoUploadImage';
const HoaxSubmit = () => {
    const { image } = useSelector((store) => ({ image: store.image }))
    const [focused, setFocused] = useState(false)
    const [hoax, setHoax] = useState('')
    const [errors, setErrors] = useState({})
    const [newImage, setNewImage] = useState()
    const { t } = useTranslation()
    useEffect(() => {
        if (!focused) {
            setHoax('')
            setErrors({})
            setNewImage()
        }
    }, [focused])

    useEffect(() => {
        setErrors({})
    }, [hoax])

    const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes', true)
    const pendingFileUpload = useApiProgress('post', '/api/1.0/hoax-attachments', true)
    const onClickHoaxify = async () => {
        const body = {
            content: hoax
        }
        try {
            await postHoax(body)
            setFocused(false)
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
            }
        }
    }
    let textAreaClass = 'form-control'
    if (errors.content) {
        textAreaClass += ' is-invalid'
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
            uploadFile(file)
        }
        fileReader.readAsDataURL(file)
    }

    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append("multipartFile", file);
        await postHoaxAttachment(attachment)
    }

    return (
        <div className='card p-1 flex-row'>
            <ProfileImageWithDefault className='rounded-circle m-1' image={image} width='45' height='45'></ProfileImageWithDefault>
            <div className='flex-fill'>
                <textarea className={textAreaClass} rows={focused ? '3' : '1'} onFocus={() => setFocused(true)} onChange={(event) => setHoax(event.target.value)} value={hoax} />
                <div className="invalid-feedback">
                    {errors.content}
                </div>
                {focused && (
                    <>
                        {!newImage && <Input type="file" onChange={onChangeFile}></Input>}
                        {newImage && <AutoUploadImage image={newImage} uploading={pendingFileUpload}></AutoUploadImage>}
                        <div className='text-end mt-1'>
                            <ButtonWithProgress
                                className='btn btn-primary'
                                onClick={onClickHoaxify}
                                disabled={pendingApiCall || pendingFileUpload}
                                pendingApiCall={pendingApiCall}
                                text='Hoaxify'
                            >
                            </ButtonWithProgress>
                            <button
                                className='btn btn-light  d-inline-flex ms-2'
                                onClick={() => setFocused(false)}
                                disabled={pendingApiCall || pendingFileUpload}
                            ><span className="material-icons ">close</span>{t('Cancel')}</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HoaxSubmit;