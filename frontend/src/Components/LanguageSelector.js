import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { changeLanguage } from '../Api/ApiCalls';
import i18n from '../i18next';

const LanguageSelector = (props) => {

    const onChangeLanguage = (language) => {
        const { i18n } = props;
        i18n.changeLanguage(language)
        changeLanguage(language)
    }

    return (
        <div className='container'>
            <img src='https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-250.png' alt="en" width={27} style={{ cursor: 'pointer', borderRadius: 15 }} onClick={() => onChangeLanguage('en')} />
            <img src='https://cdn.countryflags.com/thumbs/turkey/flag-square-250.png' alt="tr" width={27} style={{ marginLeft: 5, cursor: 'pointer', borderRadius: 15 }} onClick={() => onChangeLanguage('tr')} />
        </div>
    );
}
export default withTranslation()(LanguageSelector);