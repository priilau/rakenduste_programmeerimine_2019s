import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Header from "./components/Header.jsx";
import {BrowserRouter, Route/*, Link*/} from "react-router-dom";


const content = document.getElementById("container");

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Header} />
    <Route path="/" exact component={HomePage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/signup" exact component={SignUpPage} />
    <Route path="/users/:userId" exact component={UserPage} />
    <Route path="/items/:itemId" exact component={ProductPage} />
  </BrowserRouter>,
  content,
);