import React from "react";
import {Link} from "react-router-dom";
import {userIcon, cartIcon} from "../icons.js";
import PropTypes from "prop-types";
import "./header.css";

const Header = ({token, user}) => {
  console.log("token: ", token);
  return (
    <div id="header">
      <Link to={"/"}>
        <img src="/images/logo.png" id="logo" alt="Logo"/>
      </Link>
      <div id="header-btns">
        {user.email && <WelcomeIcon user={user} />}
        {!user.email && <LoginRegisterIcon />}
        
        <Link id ="header-btn" to={"/cart"}>
          <img src = {cartIcon} alt="Cart"/>
        </Link>
      </div>
    </div>
  );
};

Header.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
};

const LoginRegisterIcon = () => {
  return(
    <Link id="header-btn" to={"/login"}>
      <img src = {userIcon} alt="User"/>
      <div className={"header-btn-text"}>Login /<br/>Register</div>
    </Link>
  );
};

const WelcomeIcon = ({user}) => {
  return(
    <Link id="header-btn" to={`/users/${user._id}`}>
      <img src = {userIcon} alt="User"/>
      <div className={"header-btn-text"}>Welcome, {user.email}</div>
    </Link>
  );
};

WelcomeIcon.propTypes = {
user: PropTypes.object.isRequired,
};

export default Header;