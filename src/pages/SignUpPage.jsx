import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as services from "../services.js";
import FancyButton from "../components/FancyButton.jsx";
import "./signuppage.css";

class SignUpPage extends React.PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        services.signup(this.state)
        .then(() => {
            toast.success("Signup success!", {position: "bottom-right"});
            this.props.history.push("/login");
        })
        .catch(err => {
            toast.error("Signup failed!", {position: "bottom-right"});
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
            <div className={"signup"}>
                <form className={"signup-wrapper"} onSubmit={this.handleSubmit}>
                <input type={"email"} name="email"  onChange={this.handleChange} placeholder="email" value={this.state.email} />
                <input type={"password"} name="password" onChange={this.handleChange} placeholder="password" value={this.state.password} />
                <input type={"password"} name="confirmPassword" onChange={this.handleChange} placeholder="confirm password" value={this.state.confirmPassword} />
                <FancyButton onClick={this.handleSubmit}>Sign up</FancyButton>
                <div className="message">
                    Already registered?
                    <Link to={"/login"}>Log in here!</Link>
                </div>
                </form>
            </div>
        );
    }
}

export default SignUpPage;