import axios from 'axios';

export const signUp = (body) => {
    return axios.post('/api/1.0/users', body)
}

export const login = (body) => {
    return axios.post('/api/1.0/auth', body, { auth: body })
}

export const getUsers = (page = 0, size = 3) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`)
}

export const changeLanguage = (language) => {
    axios.defaults.headers['accept-language'] = language
}
