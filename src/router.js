import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PageNotFound from "./components/shared/page-not-found/page-not-found";
import Home from "./components/application/home/home";
import ProductListing from "./components/application/product-listing/productListing";

export default class OndcRoutes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={"/"} exact component={() => <Redirect to={"/home"} />} />
          <Route path={"/home"} component={Home} />
          <Route path={"/products"} component={ProductListing} />
          <Route path="/page-not-found" component={PageNotFound} />
          <Route path="" component={() => <Redirect to="/page-not-found" />} />
        </Switch>
      </Router>
    );
  }
}
