import React, { Component } from 'react';

export const Authenticaton = React.createContext()

class AuthenticationContext extends Component {
    state = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    }
    onLoginSuccess = (authState) => {
        this.setState({
            ...authState,
            isLoggedIn: true
        })
    }
    onLogOutSuccess = () => {
        this.setState({
            username: undefined,
            isLoggedIn: false
        })
    }
    render() {
        return (
            <Authenticaton.Provider value={{
                state: { ...this.state },
                onLoginSuccess: this.onLoginSuccess,
                onLogOutSuccess: this.onLogOutSuccess
            }}>
                {this.props.children}
            </Authenticaton.Provider>
        );
    }
}

export default AuthenticationContext;