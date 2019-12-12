import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const Item = (props) => {
    return (
        <Link to={`/items/${props.id}`}>
            <div className="product">
                <div className="product-img">
                    <img src={props.imgSrc} alt={props.title}/>
                </div>
                <div className="product-name">
                    {props.title}
                </div>
                <div className="product-price">
                    Price: £{props.price}
                </div>
            </div>
        </Link>
    );
};

Item.propTypes = {
id: PropTypes.string.isRequired,
imgSrc: PropTypes.string.isRequired,
price: PropTypes.number.isRequired,
title: PropTypes.string.isRequired,
};

export default Item;
