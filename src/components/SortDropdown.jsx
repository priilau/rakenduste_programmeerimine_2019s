import React from "react";
import PropTypes from "prop-types";
import "./sortdropdown.css";

const SortDropdown = ({direction, onChange}) => {
    return (
        <div className="select">
            <select name="slct" id="slct" value={direction} onChange={onChange}>
                <option value="1">Price low to high</option>
                <option value="-1">Price high to low</option>
            </select>
        </div>
    );
};

SortDropdown.propTypes = {
    direction: PropTypes.oneOf([1, -1]).isRequired,
    onChange: PropTypes.func.isRequired 
};

export default SortDropdown;
