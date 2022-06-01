import React from 'react';

const HoaxSubmit = () => {
    return (
        <div className='card p-1'>
            <textarea className='form-control' />
            <div className='text-right'>
                <button className='btn btn-primary'>Hoaxify</button>
            </div>
        </div>
    );
};

export default HoaxSubmit;