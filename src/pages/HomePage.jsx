import React from "react";
import ItemList from "../components/ItemList.jsx";
import Checkbox from "../components/Checkbox.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import PropTypes from "prop-types";
import "./homepage.css";/*
import {BrowserRouter, Route, Link} from "react-router-dom";*/

class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sortDirection: 1,
            items: [],
            allCategories: ["laptops", "phones"],
            selectedCategory: ["laptops"]
        };
    }

    componentDidMount() {
        this.fetchItems();
    }

    fetchItems = () => {
        fetch("/api/v1/items")
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
        console.log(this.state.items);
        return this.state.items
            .filter(item => this.isSelected(item.category))
            .sort((a,b) => {
                switch(this.state.sortDirection) {
                    case -1:
                    return b.price - a.price;
                    case 1:
                    return a.price - b.price;
                }
            })
        ;
    }
  
    handleDropdown = (event) => {
        /*
        this.setState({
            selectedCategory: e.target.value,
        });
        */
        if(this.isSelected(event.target.name)) {
            const clone = this.state.selectedCategory.slice();
            const index = this.state.selectedCategory.indexOf(event.target.name);
            clone.splice(index, 1);
            this.setState({
                selectedCategory: clone
            });
        } else {
            this.setState({
                selectedCategory: this.state.selectedCategory.concat([event.target.name])
            });
        }
    }

    handleSortDropdown = (event) => {
        this.setState({
            sortDirection: parseInt(event.target.value),
        });
    }

    isSelected = (name) => this.state.selectedCategory.indexOf(name) >= 0;
  
    render() {
        const items = this.getVisibleItems();
        return (
            <React.Fragment>
                <ItemFilters
                allCategories = {this.state.allCategories}
                handleDropdown = {this.handleDropdown}
                isSelected = {this.isSelected}
                />
                <div className="items-settings">
                    <div>
                        Items found: {items.length}
                    </div>
                    <SortDropdown
                        direction = {this.state.sortDirection}
                        onChange = {this.handleSortDropdown}
                    />
                </div>
                <ItemList items={items}/>
            </React.Fragment>
        );
    }
}

const ItemFilters = ({allCategories, handleDropdown, isSelected}) => {
    return (
        <div>
        {
            allCategories.map(categoryName => {
            return (
                <Checkbox key={categoryName} name={categoryName} onChange={handleDropdown} checked={isSelected(categoryName)}/>
                );
            })
        }
        </div>
    );
};

ItemFilters.propTypes = {
    allCategories: PropTypes.array.isRequired,
    handleDropdown: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired,
};

export default HomePage;
