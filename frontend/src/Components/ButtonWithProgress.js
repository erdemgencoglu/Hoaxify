import React, { Component } from 'react';

const ButtonWithProgress = (props) => {
    const { onClick, pendingApiCall, disabled, text, className } = props
    return (
        <div>
            <button className={className || 'btn btn-primary'} onClick={onClick} disabled={disabled}>
                {text}
                {pendingApiCall && <span className="spinner-border spinner-border-sm" ></span>}
            </button>
        </div >
    );
}

export default ButtonWithProgress;