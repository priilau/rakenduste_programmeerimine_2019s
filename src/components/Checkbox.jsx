import React from "react";
import PropTypes from "prop-types";
import "./checkbox.css";

const Checkbox = ({name, onChange, checked}) => {
    return(
        <div className="item-filters-wrapper">
            <div className="category-toggle">
                <div>{name}</div>
                <input type="checkbox" className={"cbx"} id={name} name={name} style={{display: "none"}} onChange={onChange} checked={checked} />
                <label htmlFor={name} className="toggle"><span></span></label>   
            </div>
        </div>
    );  
};

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
};

export default Checkbox;

