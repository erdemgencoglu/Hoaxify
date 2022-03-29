import React, { Component } from 'react';
import axios from 'axios';

class ApiProgress extends Component {
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
            <div>
                {React.cloneElement(this.props.children, { pendingApiCall: pendingApiCall })}
            </div>
        );
    }
    updateApiCallFor = (url, inProgress) => {
        if (url === this.props.path) {
            this.setState({ pendingApiCall: inProgress })
        }
    };
}

export default ApiProgress;