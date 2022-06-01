import React from 'react';
import HoaxSubmit from '../Components/HoaxSubmit';
import UserList from '../Components/UserList';

const HomePage = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-xs-12 col-md-8'>
                    Hoax Submit
                    <HoaxSubmit ></HoaxSubmit>
                </div>
                <div className='col-xs-12 col-md-4'>
                    <UserList></UserList>
                </div>
            </div>
        </div>
    );
};

export default HomePage;