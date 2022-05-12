import { useEffect, useState } from 'react';
import axios from 'axios';


export const useApiProgress = (apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false)
    useEffect(() => {
        let requestInterceptor, responseInterceptor;
        const updateApiCallFor = (url, inProgress) => {
            if (url.startsWith(apiPath)) {
                setPendingApiCall(inProgress)
            }
        };
        const registerInterCeptors = () => {
            //axios methodları ile yönetme
            //request
            requestInterceptor = axios.interceptors.request.use((request) => {
                console.log("runnig request interceptor", apiPath);
                updateApiCallFor(request.url, true)
                return request
            });
            //response
            responseInterceptor = axios.interceptors.response.use((response) => {
                updateApiCallFor(response.config.url, false)
                return response
            }, (error) => {
                updateApiCallFor(error.config.url, false)
                throw error;
            });
        }
        const unRegisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor)
            axios.interceptors.response.eject(responseInterceptor)
        }
        registerInterCeptors();
        return function unmount() {
            unRegisterInterceptors();
        }

    }, [])
    return pendingApiCall
}
