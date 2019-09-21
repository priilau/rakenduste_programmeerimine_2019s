import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage.jsx";
import ProductPage from "./ProductPage.jsx";
import {BrowserRouter, Route, Link} from "react-router-dom";


const content = document.getElementById("container");

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" exact component={HomePage} />
    <Route path="/product" exact component={ProductPage} />
  </BrowserRouter>,
  content,
);