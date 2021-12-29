import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PageNotFound from "./components/shared/page-not-found/page-not-found";
import Home from "./components/application/home/home";
import ProductListing from "./components/application/product-listing/productListing";
import Cart from "./components/application/cart/cart";

export default class OndcRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={"/"} exact component={() => <Redirect to={"/home"} />} />
        <Route path={"/home"} component={Home} />
        <Route path={"/products"} component={ProductListing} />
        <Route path="/page-not-found" component={PageNotFound} />
        <Route path="/cart" component={Cart} />
        <Route path="" component={() => <Redirect to="/page-not-found" />} />
      </Switch>
    );
  }
}
