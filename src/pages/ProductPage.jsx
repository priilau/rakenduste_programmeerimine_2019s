import React from "react";
import PropTypes from "prop-types";
import FancyButton from "../components/FancyButton.jsx";
import {connect} from "react-redux";
import {addItem} from "../store/store.js";
import "./productpage.css";

class ProductPage extends React.PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.fetchItem();
    }

    fetchItem = () => {
        fetch(`/api/v1/items/${this.props.match.params.itemId}`)
        .then(res => {
            return res.json();
        })
        .then(item => {
            this.setState({
                ...item,
            });
        })
        .catch(err => {
            console.log("product page error: ", err);
        });
    };

    handleBuy = () => {
        this.props.dispatch(addItem(this.state));
    };

    render() {
        return (
            <React.Fragment>
                <div className="product-description">
                    <div className="product-img">
                        <img src={this.state.imgSrc} alt={this.state.title} />
                    </div>
                    <div className="product-name">
                        {this.state.title}
                    </div>
                    <div className="product-price">
                    £{this.state.price}
                    </div>
                    <FancyButton onClick={this.handleBuy}>Add to cart</FancyButton>
                </div>
                <div className={"similar-items"}>
                    <div className={"items"}>
                        Similar items
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

ProductPage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default connect()(ProductPage);