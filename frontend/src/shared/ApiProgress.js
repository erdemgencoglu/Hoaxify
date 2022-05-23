import { useEffect, useState } from 'react';
import axios from 'axios';


export const useApiProgress = (apiMethod, apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false)
    useEffect(() => {
        let requestInterceptor, responseInterceptor;
        const updateApiCallFor = (method, url, inProgress) => {
            if (url.startsWith(apiPath) && method === apiMethod) {
                setPendingApiCall(inProgress)
            }
        };
        const registerInterCeptors = () => {
            //axios methodları ile yönetme
            //request
            requestInterceptor = axios.interceptors.request.use((request) => {
                const { url, method } = request
                console.log("runnig request interceptor", apiPath);
                updateApiCallFor(method, url, true)
                return request
            });
            //response
            responseInterceptor = axios.interceptors.response.use((response) => {
                const { url, method } = response.config
                updateApiCallFor(method, url, false)
                return response
            }, (error) => {
                const { url, method } = error.config
                updateApiCallFor(method, url, false)
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

    }, [apiPath, apiMethod])
    return pendingApiCall
}
