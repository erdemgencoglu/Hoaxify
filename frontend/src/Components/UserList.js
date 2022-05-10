import React, { Component } from 'react';
import { getUsers } from '../Api/ApiCalls'
import { withTranslation } from 'react-i18next';
class UserList extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        getUsers().then(response => {
            this.setState({
                users: response.data
            })
        })
    }
    render() {
        const { t } = this.props;
        const { users } = this.state;
        return (
            <div className='card' style={{ marginBottom: 10 }}>
                <h3 className='card-header text-center'>{t('Users')}</h3>
                <div className='list-group-flush'>
                    {users.map((user, index) => (
                        <div className='list-group-item list-group-item-action' key={user.username}>{user.username}</div>
                    ))}
                </div>

            </div>
        );
    }
}

export default withTranslation()(UserList);