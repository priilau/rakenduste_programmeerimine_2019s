import React from "react";
import {Link} from "react-router-dom";

const ItemList = (props) => {
    return (
      <div id="content">
        <div id="products"> 
          {
            props.items.map(item => {
            return <Item 
              imgSrc = {item.imgSrc}
              price = {item.price}
              title = {item.title}
            />
            })
          } 
        </div>
      </div>
    )
  };

  const Item = (props) => {
    return (
      <Link to={"/product"}>
        <div id="product">
          <div id="product-img">
            <img src={props.imgSrc} alt={props.title}/>
          </div>
          <div id="product-name">
            {props.title}
          </div>
          <div id="product-price">
            {props.price}
          </div>
        </div>
      </Link>
    )
  };

  export default ItemList;