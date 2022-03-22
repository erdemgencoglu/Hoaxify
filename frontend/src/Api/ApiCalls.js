import axios from 'axios';

export const signUp = (body) => {
    return axios.post('/api/1.0/users', body)
}

export const login = (body) => {
    return axios.post('/api/1.0/auth', body, { auth: body })
}

export const changeLanguage = (language) => {
    axios.defaults.headers['accept-language'] = language
}
