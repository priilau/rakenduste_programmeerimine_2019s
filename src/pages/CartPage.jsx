import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FancyButton from "../components/FancyButton.jsx";
import {removeItem} from "../store/store.js";
import "./cartpage.css";

class CartPage extends React.PureComponent {
    static propTypes = {
        cart: PropTypes.arrayOf(PropTypes.shape(ItemProps)).isRequired,
        dispatch: PropTypes.func.isRequired
    }

    handleCheckout = () => {
        console.log("handleCheckout");
    }

    handleRemove = (_id) => {
        this.props.dispatch(removeItem(_id));
    }

    calcNumbers = () => {
        const VAT = 20;
        const subtotal = parseFloat((this.props.cart.reduce((acc, item) => acc + item.price, 0)).toFixed(2));
        const tax = parseFloat((subtotal / 100 * VAT).toFixed(2));
        return {
            subtotal,
            tax
        };
    }
    
    render() {
        const {subtotal, tax} = this.calcNumbers();
        return (
            <div className={"cart-content"}>
                <div>
                    <Table onRemove={this.handleRemove} rows={this.props.cart} />
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr><td>Subtotal</td><td>£{subtotal}</td></tr>
                            <tr><td>Tax</td><td>£{tax}</td></tr>
                            <tr><td>Total</td><td>£{subtotal + tax}</td></tr>
                            <tr>
                                <td>
                                    <FancyButton onClick={this.handleCheckout}>Checkout</FancyButton>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const Table = ({rows, onRemove}) => {
    return (
        <div className={"cart-table"}>
            <table className={"cart-table-header"}>
                <tbody>
                    <tr>
                        <th>
                            Product
                        </th>
                        <th>
                            Category
                        </th>
                        <th>
                            Price
                        </th>
                        <th></th>
                    </tr>
                </tbody>
                
            </table>
            {rows.map((row, index) => <Row onRemove={onRemove} key={index} {...row} />)}
        </div>
    );
};

Table.propTypes = {
    rows: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
};

const Row = ({_id, title, imgSrc, category, price, onRemove}) => {
    return (
        <div className={"row"}>
            <div className={"product-img"}>
                <img src={imgSrc} alt="ProductImg"/>
            </div>
            <div className={"product-title"}>
                {title}
            </div>
            <div className={"product-category"}>
                {category}
            </div>
            <div className={"product-price"}>
                £{price}
            </div>
            <div className={"remove-btn"}>
                <FancyButton onClick={() => onRemove(_id)}>Remove</FancyButton>
            </div>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        cart: store.cart
    };
};

Row.propTypes = {
    ...ItemProps,
    onRemove: PropTypes.func.isRequired
};

export const ItemProps = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(CartPage);