import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import "./loginpage.css";

class LoginPage extends React.PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
        onLogin: PropTypes.func.isRequired,
    }
    
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state),
        })
        .then(res => res.json())
        .then(({token, user}) => {
            this.props.onLogin({token, user});
            this.props.history.push(`/users/${user._id}`);
        }).catch(err => {
            console.log("Error: ", err);
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        });
    }

    render() {
        return (
            <div className={"login"}>
                <form className={"login-wrapper"} onSubmit={this.handleSubmit}>
                    <input type={"email"} name="email" onChange={this.handleChange} placeholder="email" value={this.state.email} />
                    <input type={"password"} name="password" onChange={this.handleChange} placeholder="password" value={this.state.password} />
                    <input type="submit" value="Log in"/>
                    <div className="message">
                        Not registered?
                        <Link to={"/signup"}>Create an account!</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;