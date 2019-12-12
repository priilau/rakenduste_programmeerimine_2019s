import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const ItemList = (props) => {
    return (
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
    );
  };

  const Item = (props) => {
    return (
      <Link to={`/items/${props.id}`}>
        <div className="product">
          <div className={"product-left"}>
            <div className="product-img">
              <img src={props.imgSrc} alt={props.title}/>
            </div>
          </div>
          <div className={"product-right"}>
            <div className="product-name">
              {props.title}
            </div>
            <div className={"product-info"}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div className="product-price">
              Price: £{props.price}
            </div>
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