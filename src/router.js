import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PageNotFound from "./components/shared/page-not-found/page-not-found";
import Home from "./components/application/home/home";
import ProductListing from "./components/application/product-listing/productListing";
import Cart from "./components/application/cart/cart";
import Login from "./components/auth/login";
import ProtectedRoutes from "./protectedRoutes";
import Checkout from "./components/application/checkout/checkout";

export default class OndcRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={"/"} exact component={() => <Redirect to={"/login"} />} />
        <Route path={"/login"} component={Login} />
        <ProtectedRoutes path={"/home"}>
          <Home />
        </ProtectedRoutes>
        <ProtectedRoutes path={"/products"}>
          <ProductListing />
        </ProtectedRoutes>
        <ProtectedRoutes path="/cart">
          <Cart />
        </ProtectedRoutes>
        <ProtectedRoutes path="/checkout">
          <Checkout />
        </ProtectedRoutes>
        <Route path="/page-not-found" component={PageNotFound} />
        <Route path="" component={() => <Redirect to="/page-not-found" />} />
      </Switch>
    );
  }
}
