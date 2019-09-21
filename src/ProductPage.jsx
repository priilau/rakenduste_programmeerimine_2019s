import React from "react";
import Header from "./Header.jsx";
import {laptops} from "./items.js";

class ProductPage extends React.PureComponent {
    render() {
        const item = laptops[0];
        return (
            <>
                <Header/>
                <div id="product-description">
                    <div id="product-img">
                        <img src={item.imgSrc} alt={item.title} />
                    </div>
                    <div id="product-name">
                        {item.title}
                    </div>
                    <div id="product-price">
                        {item.price}
                    </div>
                </div>
            </>
        )
    }
}

export default ProductPage;