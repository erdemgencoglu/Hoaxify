import React, { Component } from 'react';
import axios from 'axios';

export function withApiProgress(WrappedComponent, apiPath) {
    return class extends Component {
        state = {
            pendingApiCall: false
        }

        componentDidMount() {
            //axios methodları ile yönetme
            axios.interceptors.request.use((request) => {
                this.updateApiCallFor(request.url, true)
                return request
            });
            axios.interceptors.response.use((response) => {
                /*if (response.config.url === this.props.path) {
                    this.setState({ pendingApiCall: false })
                }*/
                this.updateApiCallFor(response.config.url, false)
                return response
            }, (error) => {
                this.updateApiCallFor(error.config.url, false)
                throw error;
            });
        }
        render() {
            const { pendingApiCall } = this.state
            return (
                /*<div>
                    {React.cloneElement(this.props.children, { pendingApiCall: pendingApiCall })}
                </div>*/
                <WrappedComponent pendingApiCall={pendingApiCall} />
            );
        }
        updateApiCallFor = (url, inProgress) => {
            if (url === apiPath) {
                this.setState({ pendingApiCall: inProgress })
            }
        };
    }
}
