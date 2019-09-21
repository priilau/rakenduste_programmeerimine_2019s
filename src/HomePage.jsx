import React from "react";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";
import {phones, laptops} from "./items.js"; 
import {BrowserRouter, Route, Link} from "react-router-dom";

class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            items: laptops,
        }
    }
  
    handleChange(e) {
        switch(e.target.value) {
            case "phones": {
            this.setState({
                items: phones,
            });
            break;
            }
            case "laptops": {
            this.setState({
                items: laptops,
            });
            break;
            }
        }
        console.log("App state: ", this.state);
    }
  
    render() {
        return (
            <>
            <Header/>
            <select id="dropdown" onChange={this.handleChange.bind(this)}>
                <option value="laptops">Laptops</option>
                <option value="phones">Phones</option>
            </select>
            <ItemList items={this.state.items}/>
            </>
        )
    }
}

export default HomePage;
