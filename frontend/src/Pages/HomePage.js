import React from 'react';
import { useSelector } from 'react-redux';
import HoaxSubmit from '../Components/HoaxSubmit';
import UserList from '../Components/UserList';

const HomePage = () => {
    const { isLoggedIn } = useSelector(store => ({ isLoggedIn: store.isLoggedIn }))
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-xs-12 col-md-8'>
                    {isLoggedIn && <HoaxSubmit ></HoaxSubmit>}
                </div>
                <div className='col-xs-12 col-md-4'>
                    <UserList></UserList>
                </div>
            </div>
        </div>
    );
};

export default HomePage;