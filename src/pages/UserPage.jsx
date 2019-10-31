import React from "react";
import PropTypes from "prop-types";

class UserPage extends React.PureComponent {
    static propTypes = {
        user: PropTypes.object.isRequired,
    }
    render() {
        return (
            <div>
                Logged in as: {this.props.user.email}, created at {this.props.user.createdAt}
            </div>
        );
    }
}

export default UserPage;