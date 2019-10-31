import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Header from "./components/Header.jsx";
import {BrowserRouter, Route/*, Link*/} from "react-router-dom";

class App extends React.Component {
  state = {
    token: null,
    user: {
      email: null,
      _id: null,
      createdAt: null
    }
  };

  handleLogin = ({token, user}) => {
    this.setState({
      user, token
    });
  }

  render() {
    return(
      <BrowserRouter>
        <Route 
          path="/" 
          render={
            (props) => <Header {...props} 
              token={this.state.token} 
              user={this.state.user}
            />
          } 
        />
        <Route path="/" exact component={HomePage} />
        <Route 
          path="/login"
          exact 
          render={(props) => <LoginPage {...props} onLogin={this.handleLogin} />} 
        />
        <Route path="/signup" exact component={SignUpPage} />
        <Route 
          path="/users/:userId" 
          exact 
          render={(props) => {
            return <UserPage {...props} user={this.state.user} />;
          }} 
        />
        <Route path="/items/:itemId" exact component={ProductPage} />
      </BrowserRouter>
    );
  }
}

const content = document.getElementById("container");

ReactDOM.render(
  <App />,
  content,
);