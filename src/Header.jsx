import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
    return (
      <div id="header">
        <Link to={"/"}>
          <img src="images/logo.png" id="logo" alt="Logo"/>
        </Link>
        <div id="header-btns">
          <input id="btn" type="button" value="Login/Signup"/>
          <input id="btn" type="button" value="Cart"/>
        </div>
      </div>
    )
  };

  export default Header;