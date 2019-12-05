import React from "react";
import Pages from "./pages/index.jsx";
import Header from "./components/Header.jsx";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./store/configureStore.js";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const {store, persistor} = configureStore();

class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <BrowserRouter>
            <Route path="/" component={Header} />
              <Switch>
                <Route path="/" exact component={Pages.HomePage} />
                <Route path="/login" exact component={Pages.LoginPage} />
                <Route path="/signup" exact component={Pages.SignUpPage} />
                <Route path="/users/:userId" exact component={Pages.UserPage} />
                <Route path="/items/:itemId" exact component={Pages.ProductPage} />
                <Route path="/cart" exact component={Pages.CartPage} />
                <Route component={Pages.NotFound} />
              </Switch>  
            </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;