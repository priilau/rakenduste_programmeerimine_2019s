import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ItemList from "../components/ItemList.jsx";
import ItemGrid from "../components/ItemGrid.jsx";
import Checkbox from "../components/Checkbox.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import {ItemProps} from "./CartPage.jsx";
import {getItems} from "../store/actions.js";
import {gridIcon, listIcon} from "../icons.js";
import * as selectors from "../store/selectors.js";
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
            selectedCategories: ["laptops"],
            grid: true,
            icon: listIcon
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

    handleGridView = () => {
        if(this.state.grid){
            this.setState({
                grid: false,
                icon: gridIcon
            });
        } else {
            this.setState({
                grid: true,
                icon: listIcon
            });
        }
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
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                <div className="items-settings">
                    <div className="items-found">
                        Items found: {items.length}
                    </div>
                    <SortDropdown
                        direction = {this.state.sortDirection}
                        onChange = {this.handleSortDropdown}
                    />
                    <div className={"categories"}>All categories:</div>
                    <ItemFilters
                    allCategories = {this.state.allCategories}
                    handleDropdown = {this.handleFilterSelect}
                    isSelected = {this.isSelected}
                    />
                </div>
                <div className={"gridview"} onClick={this.handleGridView}>
                    <img className={"gridview-btn"} src={this.state.icon} />
                </div>
                <div className={"content"}>
                    <RenderItems items={items} grid={this.state.grid} />
                </div>
            </React.Fragment>
        );
    }
}

const RenderItems = ({items, grid}) => {
    if(grid){
        return (
            <ItemGrid items={items}/>
        );
    } else {
        return(<ItemList items={items}/>);
    }     
};

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

RenderItems.propTypes = {
    items: PropTypes.array,
    grid: PropTypes.bool.isRequired
};

ItemFilters.propTypes = {
    allCategories: PropTypes.array.isRequired,
    handleDropdown: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => {
    return {
        items: selectors.getItems(store)
    };
};

export default connect(mapStateToProps)(HomePage);
