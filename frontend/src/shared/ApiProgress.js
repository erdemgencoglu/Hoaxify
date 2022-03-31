import React, { Component } from 'react';
import axios from 'axios';

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
            //axios methodları ile yönetme
            //request
            this.requestInterceptor = axios.interceptors.request.use((request) => {
                console.log("runnig request interceptor", apiPath);
                this.updateApiCallFor(request.url, true)
                return request
            });
            //response
            this.responseInterceptor = axios.interceptors.response.use((response) => {
                this.updateApiCallFor(response.config.url, false)
                return response
            }, (error) => {
                this.updateApiCallFor(error.config.url, false)
                throw error;
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseInterceptor)
        }

        updateApiCallFor = (url, inProgress) => {
            if (url === apiPath) {
                this.setState({ pendingApiCall: inProgress })
            }
        };

        render() {
            const { pendingApiCall } = this.state
            return (
                /*<div>
                    {React.cloneElement(this.props.children, { pendingApiCall: pendingApiCall })}
                </div>*/
                //tüm propertileri passlıyoruz kullandığımız yerlere
                <WrappedComponent pendingApiCall={pendingApiCall} {...this.props} />
            );
        }

    }
}