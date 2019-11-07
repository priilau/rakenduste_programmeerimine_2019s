import React from "react";
import PropTypes from "prop-types";
import { getItems } from "../actions/itemsActions.js";

class CartPage extends React.PureComponent {
    state = {
        rows: []
    };

    componentDidMount() {
        getItems()
        .then(items => {
            this.setState({
                rows: items.slice(0, 4)
            });
        })
        .catch(err => {
            console.log("Error:", err);
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Table rows={this.state.rows} />
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr><td>Subtotal</td><td>£200</td></tr>
                            <tr><td>Tax</td><td>£23</td></tr>
                            <tr><td>Total</td><td>£223</td></tr>
                            <tr>
                                <td>
                                    <div className={"submit-btn"}>
                                        Checkout
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const Table = ({rows}) => {
    return (
        <div>
            <div>
                <div>
                    Product
                </div>
                <div>
                    Category
                </div>
                <div>
                    Price
                </div>
            </div>
            {rows.map((row) => <Row key={row._id} {...row} />)}
        </div>
    );
};

Table.propTypes = {
    rows: PropTypes.array.isRequired
};

const Row = ({title, imgSrc, category, price}) => {
    return (
        <div className={"row"}>
            <div>
                <img src={imgSrc} alt="ProductImg"/>
            </div>
            <div>
                {title}
            </div>
            <div>
                {category}
            </div>
            <div>
                £{price}
            </div>
        </div>
    );
};

Row.propTypes = ItemProps;

export const ItemProps = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default CartPage;