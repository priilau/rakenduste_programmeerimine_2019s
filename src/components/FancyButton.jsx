import React from "react";
import PropTypes from "prop-types";
import "./fancybutton.css";

const FancyButton = ({children, onClick}) => {
    return(
    <div className={"submit-btn"} onClick={onClick}>
        {children}
    </div>
    );
};

FancyButton.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default FancyButton;