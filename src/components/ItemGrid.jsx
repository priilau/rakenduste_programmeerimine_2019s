import React from "react";
import Item from "./Item.jsx";
import PropTypes from "prop-types";
import Slider from "react-slick";

const ItemGrid = (props) => {
    const settings = {
        dots: true,
        rows: 2,
        slidesPerRow: 4,
    };
    return (
        <div className="products grid"> 
            <Slider {...settings}>
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
            </Slider>
        </div>
    );
  };

  ItemGrid.propTypes = {
    items: PropTypes.array.isRequired,
  };

  export default ItemGrid;