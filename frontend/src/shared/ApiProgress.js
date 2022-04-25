import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';


export const useApiProgress = (apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false)
    useEffect(() => {

        const updateApiCallFor = (url, inProgress) => {
            if (url === apiPath) {
                setPendingApiCall(inProgress)
            }
        };
        const registerInterCepters = () => {
            let requestInterceptor, responseInterceptor
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
        registerInterCepters();

        const unRegisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor)
            axios.interceptors.response.eject(responseInterceptor)
        }

    })
    return pendingApiCall
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}


export function withApiProgress(WrappedComponent, apiPath) {
    return class extends Component {
        static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`
        //static displayName = "ApiProgress(" + getDisplayName(WrappedComponent) + ")"
        state = {
            pendingApiCall: false
        }
        componentDidMount() {
            this.registerInterCepters()
        }
        componentWillUnmount() {
            this.unRegisterInterceptors()
        }
        render() {
            const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall
            return (
                //tüm propertileri passlıyoruz kullandığımız yerlere
                <WrappedComponent  {...this.props} pendingApiCall={pendingApiCall} />
            );
        }

    }
}
