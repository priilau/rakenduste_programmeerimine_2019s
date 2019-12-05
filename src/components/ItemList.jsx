import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const ItemList = (props) => {
    return (
      <div className="content">
        <div className="products"> 
          {
            props.items.map(item => {
              return <Item
                key = {item._id}
                id = {item._id}
                imgSrc = {item.imgSrc}
                price = {item.price}
                title = {item.title}
              />;
            })
          } 
        </div>
      </div>
    );
  };

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
            £{props.price}
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

  ItemList.propTypes = {
    items: PropTypes.array.isRequired,
  };

  export default ItemList;