import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FancyButton from "../components/FancyButton.jsx";
import {removeItem} from "../store/actions.js";
import {toast} from "react-toastify";
import * as selectors from "../store/selectors.js";
import * as services from "../services.js";
import "./cartpage.css";

class CartPage extends React.PureComponent {
    static propTypes = {
        cartItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
        dispatch: PropTypes.func.isRequired
    }

    state = {
        cartItems: [],
    }

    componentDidMount() {
        this.fetchItems();
    }

    componentDidUpdate(prevProps) {
        const prevPropIds = prevProps.cartItemIds.join("");
        const currentIds = this.props.cartItemIds.join("");
        if(prevPropIds !== currentIds) {
            this.fetchItems();
        }
    }

    handleCheckout = () => {
        console.log("handleCheckout");
    }

    handleRemove = (_id) => {
        this.props.dispatch(removeItem(_id));
    }

    calcNumbers = () => {
        const VAT = 20;
        const subtotal = parseFloat((this.state.cartItems.reduce((acc, item) => acc + item.price, 0)).toFixed(2));
        const tax = parseFloat((subtotal / 100 * VAT).toFixed(2));
        return {
            subtotal,
            tax
        };
    }

    fetchItems = () => {
        const promises = this.props.cartItemIds.map(itemId => services.getItem({itemId}));
        Promise.all(promises)
        .then(items => {
            this.setState({
                cartItems: items,
            });
        })
        .catch(err => {
            console.log(err);
            toast.error("Failed fetching items!", {position: "bottom-right"});
        });
    }
    
    render() {
        const {subtotal, tax} = this.calcNumbers();
        return (
            <div className={"content"}>
                <div className={"cart-container"}>
                    <Table onRemove={this.handleRemove} rows={this.state.cartItems} />
                </div>
                <div className={"checkout"}>
                    <table>
                        <tbody>
                            <tr><td>Subtotal:</td><td className={"sum"}>£{subtotal}</td></tr>
                            <tr><td>Tax:</td><td className={"sum"}>£{tax}</td></tr>
                            <tr><td>Total:</td><td className={"sum"}>£{subtotal + tax}</td></tr>
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
        <div className={"cart"}>
            <div className={"cart-header"}>Items currently in your cart</div>
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
            <div className={"row-left"}>
                <div className={"product-thumb"}>
                    <img src={imgSrc} alt="ProductImg"/>
                </div>
            </div>
            <div className={"row-right"}>
                <div className={"product-name"}>
                    {title}
                </div>
                <div className={"product-category"}>
                    Category: {category}
                </div>
                <div className={"product-price"}>
                    Price: £{price}
                </div>
                <div className={"remove-btn"}>
                    <FancyButton onClick={() => onRemove(_id)}>Remove</FancyButton>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        cartItemIds: selectors.getCart(store)
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