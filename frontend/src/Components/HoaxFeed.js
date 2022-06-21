import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { getHoaxes, getNewHoaxCount, getNewHoaxes, getOldHoaxes } from '../Api/ApiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import HoaxView from './HoaxView';
import Spinner from './Spinner';
const HoaxFeed = () => {
    const { username } = useParams()
    const [hoaxPage, setHoaxPage] = useState({ content: [], last: true, number: 0 })
    const [newHoaxCount, setNewHoaxCount] = useState(0)
    const { t } = useTranslation();
    //son hoaxın id si
    let lastHoaxId = 0;
    let firstHoaxId = 0;
    if (hoaxPage.content.length > 0) {
        firstHoaxId = hoaxPage.content[0].id
        const lastHoaxIndex = hoaxPage.content.length - 1
        lastHoaxId = hoaxPage.content[lastHoaxIndex].id
    }


    const path = username ? `/api/1.0/users/${username}/hoaxes?page=` : `/api/1.0/hoaxes?page=`
    const initialHoaxProgress = useApiProgress('get', path)

    const oldHoaxPath = username ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}` : `/api/1.0/hoaxes/${lastHoaxId}`
    const loadOldHoaxesPrgoress = useApiProgress('get', oldHoaxPath, true)

    const newHoaxPath = username ? `/api/1.0/users/${username}/hoaxes/${firstHoaxId}?direction=after` : `api/1.0/hoaxes/${firstHoaxId}?direction=after`
    const loadNewHoaxesPrgoress = useApiProgress('get', newHoaxPath, true)

    useEffect(() => {
        const getCount = async () => {
            const response = await getNewHoaxCount(firstHoaxId, username)
            setNewHoaxCount(response.data.count)
        }
        let looper = setInterval(getCount, 5000)
        return function cleanup() {
            clearInterval(looper)
        }
    }, [firstHoaxId, username])

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
    const loadNewHoaxes = async () => {
        const response = await getNewHoaxes(firstHoaxId, username)
        setHoaxPage(previousHoaxPage => ({
            ...previousHoaxPage,
            content: [...response.data, ...previousHoaxPage.content]
        }))
        setNewHoaxCount(0);
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
            {newHoaxCount > 0 &&
                <div className='alert alert-secondary text-center mb-1'
                    style={{ cursor: loadNewHoaxesPrgoress ? 'not-allowed' : 'pointer' }}
                    onClick={loadNewHoaxesPrgoress ? () => { } : loadNewHoaxes}>
                    {loadNewHoaxesPrgoress ? <Spinner></Spinner> : t('Load new hoaxes')}
                </div>}
            {content.map(hoax => {
                return <HoaxView key={hoax.id} hoax={hoax}></HoaxView>
            })}
            {
                !last && <div className='alert alert-secondary text-center'
                    style={{ cursor: loadOldHoaxesPrgoress ? 'not-allowed' : 'pointer' }} onClick={loadOldHoaxesPrgoress ? () => { } : loadOldHoaxes}>
                    {loadOldHoaxesPrgoress ? <Spinner></Spinner> : t('Load old hoaxes')}
                </div>
            }
        </div >
    );
};

export default HoaxFeed;