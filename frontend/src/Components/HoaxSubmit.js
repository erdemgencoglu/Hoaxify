import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { postHoax } from '../Api/ApiCalls';

const HoaxSubmit = () => {
    const { image } = useSelector((store) => ({ image: store.image }))
    const [focused, setFocused] = useState(false)
    const { t } = useTranslation()
    const [hoax, setHoax] = useState('')
    const [errors, setErrors] = useState({})
    useEffect(() => {
        if (!focused) {
            setHoax('')
            setErrors({})
        }
    }, [focused])

    useEffect(() => {
        setErrors({})
    }, [hoax])

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
    return (
        <div className='card p-1 flex-row'>
            <ProfileImageWithDefault className='rounded-circle m-1' image={image} width='45' height='45'></ProfileImageWithDefault>
            <div className='flex-fill'>
                <textarea className={textAreaClass} rows={focused ? '3' : '1'} onFocus={() => setFocused(true)} onChange={(event) => setHoax(event.target.value)} value={hoax} />
                <div className="invalid-feedback">
                    {errors.content}
                </div>
                {focused && <div className='text-end mt-1'>
                    <button className='btn btn-primary' onClick={onClickHoaxify}>Hoaxify</button>
                    <button
                        className='btn btn-light  d-inline-flex ms-2'
                        onClick={() => setFocused(false)
                        }
                    ><span className="material-icons ">close</span>{t('Cancel')}</button>
                </div>}
            </div>
        </div>
    );
};

export default HoaxSubmit;