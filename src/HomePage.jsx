import React from "react";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";/*
import {BrowserRouter, Route, Link} from "react-router-dom";*/

class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selectedCategory: "laptops"
        };
    }

    componentDidMount() {
        this.fetchItems();
    }

    fetchItems = () => {
        fetch("/api/items")
        .then(res => {
            return res.json();
        })
        .then(items => {
            this.setState({
                items
            });
        })
        .catch(err => {
            console.log("error: ", err);
        });
    };

    getVisibleItems = () => {
        return this.state.items.filter(item => item.category === this.state.selectedCategory);
    }
  
    handleChange(e) {
        this.setState({
            selectedCategory: e.target.value,
        });
    }
  
    render() {
        return (
            <React.Fragment>
                <Header/>
                <select id="dropdown" onChange={this.handleChange.bind(this)}>
                    <option value="laptops">Laptops</option>
                    <option value="phones">Phones</option>
                </select>
                <ItemList items={this.getVisibleItems()}/>
            </React.Fragment>
        );
    }
}

export default HomePage;
