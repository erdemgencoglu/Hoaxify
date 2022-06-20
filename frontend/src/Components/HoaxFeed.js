import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { getHoaxes, getOldHoaxes } from '../Api/ApiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import HoaxView from './HoaxView';
import Spinner from './Spinner';
const HoaxFeed = () => {
    const { username } = useParams()
    const [hoaxPage, setHoaxPage] = useState({ content: [], last: true, number: 0 })
    const { t } = useTranslation();
    //son hoaxın id si
    let lastHoaxId = 0;
    if (hoaxPage.content.length > 0) {
        const lastHoaxIndex = hoaxPage.content.length - 1
        lastHoaxId = hoaxPage.content[lastHoaxIndex].id
    }


    const path = username ? `/api/1.0/users/${username}/hoaxes?page=` : `/api/1.0/hoaxes?page=`
    const oldHoaxPath = username ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}` : `/api/1.0/hoaxes/${lastHoaxId}`

    const initialHoaxProgress = useApiProgress('get', path)
    const loadOldHoaxesPrgoress = useApiProgress('get', oldHoaxPath, true)


    useEffect(() => {
        const loadHoaxes = async (page) => {
            try {
                const response = await getHoaxes(username, page)
                setHoaxPage(previousHoaxPage => ({
                    ...response.data,
                    content: [...previousHoaxPage.content, ...response.data.content]
                }))
            } catch (error) {

            }
        }
        loadHoaxes();
    }, [username])


    const loadOldHoaxes = async (page) => {
        try {

            const response = await getOldHoaxes(lastHoaxId, username)
            setHoaxPage(previousHoaxPage => ({
                ...response.data,
                content: [...previousHoaxPage.content, ...response.data.content]
            }))
        } catch (error) {

        }
    }

    const { content, last } = hoaxPage
    if (content.length === 0) {
        return (
            <div className='alert alert-secondary text-center'>
                {initialHoaxProgress ? <Spinner></Spinner> : t('There are no hoaxes')}
            </div>
        )
    }
    return (
        <div>
            {content.map(hoax => {
                return <HoaxView key={hoax.id} hoax={hoax}></HoaxView>
            })}
            {
                !last && <div className='alert alert-secondary text-center'
                    style={{ cursor: loadOldHoaxesPrgoress ? 'not-allowed' : 'pointer' }} onClick={loadOldHoaxesPrgoress ? () => { } : () => { loadOldHoaxes() }}>
                    {loadOldHoaxesPrgoress ? <Spinner></Spinner> : t('Load old hoaxes')}
                </div>
            }
        </div >
    );
};

export default HoaxFeed;