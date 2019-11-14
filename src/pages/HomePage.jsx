import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ItemList from "../components/ItemList.jsx";
import Checkbox from "../components/Checkbox.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import {ItemProps} from "./CartPage.jsx";
import {getItems} from "../store/store.js";
import "./homepage.css";

class HomePage extends React.PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape(ItemProps)).isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            sortDirection: 1,
            allCategories: ["laptops", "phones"],
            selectedCategories: ["laptops"]
        };
    }

    componentDidMount() {
        this.props.dispatch(getItems());
    }

    getVisibleItems = () => {
        return this.props.items
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
  
    handleFilterSelect = (event) => {
        const categoryName = event.target.name;
        if(this.isSelected(categoryName)) {
            return this.unselectCategory(categoryName);
        }
        this.selectCategory(categoryName);
    }

    handleSortDropdown = (event) => {
        this.setState({
            sortDirection: parseInt(event.target.value),
        });
    }

    selectCategory = (categoryName) => {
        this.setState({
            selectedCategories: this.state.selectedCategories.concat([categoryName])
        });
    }

    unselectCategory = (categoryName) => {
        const newArr = this.state.selectedCategories.filter(cn => cn !== categoryName);
        this.setState({
            selectedCategories: newArr
        });
    }

    isSelected = (name) => this.state.selectedCategories.indexOf(name) >= 0;
  
    render() {
        const items = this.getVisibleItems();
        return (
            <React.Fragment>
                <ItemFilters
                allCategories = {this.state.allCategories}
                handleDropdown = {this.handleFilterSelect}
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

const mapStateToProps = (store) => {
    return {
        items: store.items
    };
};

export default connect(mapStateToProps)(HomePage);
