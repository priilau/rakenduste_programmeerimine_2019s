import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
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
        fetch("/api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state),
        })
        .then(res => res.json())
        .then(() => {
            toast.success("Sign up success!", {position: "bottom-right"});
            this.props.history.push("/login");
        })
        .catch(err => {
            toast.error("Sign up failed!", {position: "bottom-right"});
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
                <input className={"submit"} type="submit" value="Sign up"/>
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