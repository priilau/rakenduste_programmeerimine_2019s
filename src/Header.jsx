import React from "react";
import {Link} from "react-router-dom";
import {userIcon, cartIcon} from "./icons.js";
import "./header.css";

const Header = () => {
    return (
      <div id="header">
        <Link to={"/"}>
          <img src="/images/logo.png" id="logo" alt="Logo"/>
        </Link>
        <div id="header-btns">
          <div id="header-btn">
            <img src = {userIcon} alt="User"/>
          </div>
          <div id ="header-btn">
            <img src = {cartIcon} alt="Cart"/>
          </div>
        </div>
      </div>
    );
  };

  export default Header;