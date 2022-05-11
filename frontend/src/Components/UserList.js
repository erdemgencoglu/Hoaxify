import React, { useEffect, useState } from 'react';
import { getUsers } from '../Api/ApiCalls'
import { useTranslation, withTranslation } from 'react-i18next';
import UserListItem from './UserListItem';
const UserList = () => {
    const [page, setPage] = useState({
        content: [],
        size: 3,
        number: 0
    })
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
    const loadUser = page => {
        getUsers(page).then(response => {
            setPage(response.data)
        })
    }
    const { t } = useTranslation();
    const { content, last, first } = page;
    return (
        <div className='card' style={{ marginBottom: 10 }}>
            <h3 className='card-header text-center'>{t('Users')}</h3>
            {<div className='list-group-flush'>
                {content.map((user, index) => (
                    <UserListItem key={user.username} user={user} />
                ))}
            </div>}
            <div className='list-group-flush mt-2'>
                {first === false && <button className='btn btn-light btn-sm' onClick={onClickPrevious}>{t('Previous')}</button>}
                {last === false && <button className='btn btn-light btn-sm' onClick={onClickNext} style={{ float: 'right' }}>{t('Next')}</button>}
            </div>
        </div>
    );
}

export default UserList;