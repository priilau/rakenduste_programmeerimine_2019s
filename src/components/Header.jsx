import React from "react";
import {Link} from "react-router-dom";
import {userIcon, cartIcon} from "../icons.js";
import "./header.css";

const Header = () => {
    return (
      <div id="header">
        <Link to={"/"}>
          <img src="/images/logo.png" id="logo" alt="Logo"/>
        </Link>
        <div id="header-btns">
          <Link id="header-btn" to={"/login"}>
            <img src = {userIcon} alt="User"/>
          </Link>
          <Link id ="header-btn" to={"/cart"}>
            <img src = {cartIcon} alt="Cart"/>
          </Link>
        </div>
      </div>
    );
  };

  export default Header;