import React from "react";
import PropTypes from "prop-types";
import FancyButton from "../components/FancyButton.jsx";
import {connect} from "react-redux";
import {addItem} from "../store/actions.js";
import * as services from "../services.js";
import "./productpage.css";

class ProductPage extends React.PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        items: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.fetchItem();
    }

    fetchItem = () => {
        services.getItem({itemId: this.props.match.params.itemId})
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
                <div className="product-page">
                    <div className={"product-left"}>
                        <div className="product-img">
                            <img src={this.state.imgSrc} alt={this.state.title} />
                        </div>
                    </div>
                    <div className={"product-right"}>
                        <div className="product-name">
                            {this.state.title}
                        </div>
                        <div className={"product-description"}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
                        <div className={"bottom-row"}>
                            <div className={"bottom-row-left"}>
                                <div className="product-price">
                                    Price: £{this.state.price}
                                </div>
                            </div>
                            <div className={"bottom-row-right"}>
                                <FancyButton onClick={this.handleBuy}>Add to cart</FancyButton>
                            </div>
                        </div>
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