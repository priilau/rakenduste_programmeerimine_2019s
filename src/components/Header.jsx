import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {userIcon, cartIcon} from "../icons.js";
import PropTypes from "prop-types";
import authConsumer from "./authConsumer.jsx";
import {ItemProps} from "../pages/CartPage.jsx";
import "./header.css";

const Header = ({user, cart}) => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img src="/images/logo.png" className="logo" alt="Logo"/>
      </Link>
      <div className="header-btns">
        {user.email && <WelcomeIcon user={user} />}
        {!user.email && <LoginRegisterIcon />}
        
        <Link className="header-btn" to={"/cart"}>
          <Badge>{cart.length}</Badge>
          <img src={cartIcon} alt="Cart"/>
        </Link>
      </div>
    </div>
  );
};

Header.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
  cart: PropTypes.arrayOf(ItemProps).isRequired,
};

const LoginRegisterIcon = () => {
  return(
    <Link className="header-btn" to={"/login"}>
      <img src = {userIcon} alt="User"/>
      <div className={"header-btn-text"}>Login /<br/>Register</div>
    </Link>
  );
};

const WelcomeIcon = ({user}) => {
  return(
    <Link className="header-btn" to={`/users/${user._id}`}>
      <img src = {userIcon} alt="User"/>
      <div className={"header-btn-text"}>Welcome, {user.email}</div>
    </Link>
  );
};

const Badge = ({children}) => {
  if(children === 0) {
    return null;
  }
  return (
    <span className={"badge"}>{children}</span>
  );
};

Badge.propTypes = {
  children: PropTypes.number.isRequired
};

WelcomeIcon.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (store) => {
  return {
    cart: store.cart
  };
};

export default connect(mapStateToProps)(authConsumer(Header));