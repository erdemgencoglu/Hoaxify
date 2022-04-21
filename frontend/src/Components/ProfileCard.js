import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username
    const loggedUsername = props.loggedUsername

    let message = "We can not edit"
    if (loggedUsername === pathUsername) {
        message = "We can edit"
    }
    return (
        <div>
            {message}
        </div>
    );
};


const mapStateToProps = store => {
    return {
        loggedUsername: store.username
    }
}

export default connect(mapStateToProps)(withRouter(ProfileCard));