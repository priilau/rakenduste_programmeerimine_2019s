import React from "react";
import Header from "./Header.jsx";
import PropTypes from "prop-types";

class ProductPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.fetchItem();
    }

    fetchItem = () => {
        fetch(`/api/items/${this.props.match.params.itemId}`)
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

    render() {
        return (
            <React.Fragment>
                <Header/>
                    <div id="product-description">
                        <div id="product-img">
                            <img src={this.state.imgSrc} alt={this.state.title} />
                        </div>
                        <div id="product-name">
                            {this.state.title}
                        </div>
                        <div id="product-price">
                        £{this.state.price}
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}

ProductPage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default ProductPage;