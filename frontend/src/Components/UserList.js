import React, { useEffect, useState } from 'react';
import { getUsers } from '../Api/ApiCalls'
import { useTranslation, withTranslation } from 'react-i18next';
import UserListItem from './UserListItem';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
const UserList = () => {
    const [page, setPage] = useState({
        content: [],
        size: 3,
        number: 0
    })

    const [loadFailure, setLoadFailure] = useState(false)
    const pendingApiCall = useApiProgress('get', '/api/1.0/users?page')
    //didmount ile didupdate çalıştırılır infinity loop durumu oluşabilir
    //[] şartı ile [] kısmında bir değişiklik olursa çalıştır durumu oluşturuyoruz
    useEffect(() => {
        loadUser();
    }, [])

    const onClickNext = () => {
        const nextPage = page.number + 1
        loadUser(nextPage);
    }
    const onClickPrevious = () => {
        const previousPage = page.number - 1
        loadUser(previousPage);
    }
    const loadUser = async page => {
        setLoadFailure(false)
        try {
            const response = await getUsers(page)
            setPage(response.data)
        } catch (error) {
            setLoadFailure(true)
        }
    }
    const { t } = useTranslation();
    const { content, last, first } = page;
    let actionDiv = (
        <div className='list-group-flush mt-2' style={{ margin: 5 }}>
            {first === false && <button className='btn btn-light btn-sm' onClick={onClickPrevious}>{t('Previous')}</button>}
            {last === false && <button className='btn btn-light btn-sm' onClick={onClickNext} style={{ float: 'right' }}>{t('Next')}</button>}
        </div>
    )
    if (pendingApiCall) {
        actionDiv = (
            <Spinner></Spinner>
        )
    }
    return (
        <div className='card' style={{ marginBottom: 10 }}>
            <h3 className='card-header text-center'>{t('Users')}</h3>
            {<div className='list-group-flush'>
                {content.map((user, index) => (
                    <UserListItem key={user.username} user={user} />
                ))}
            </div>}
            {actionDiv}
            {loadFailure && <div className='text-center text-danger'>{t('Load Failure')}</div>}
        </div>
    );
}

export default UserList;