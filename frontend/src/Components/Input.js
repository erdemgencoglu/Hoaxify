import React, { Component } from 'react';
const Input = (props) => {
    const { label, error, name, onChange, type } = props
    const classname = error ? 'form-control is-invalid' : "form-control"
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input className={classname} name={name} onChange={onChange} type={type}></input>
            <div className="invalid-feedback">
                {props.error}
            </div>
        </div>
    )
}

export default Input;