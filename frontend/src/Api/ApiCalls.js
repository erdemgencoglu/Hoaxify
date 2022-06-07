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

export const getUser = username => {
    return axios.get(`/api/1.0/users/${username}`)
}

export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`, body)
}


export const postHoax = (body) => {
    return axios.post('/api/1.0/hoaxes', body)
}

export const changeLanguage = (language) => {
    axios.defaults.headers['accept-language'] = language
}

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
    if (isLoggedIn) {
        const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`//btoa stringi base64 e çevirir
        axios.defaults.headers['Authorization'] = authorizationHeaderValue
    }
    else {
        delete axios.defaults.headers['Authorization']
    }
}
