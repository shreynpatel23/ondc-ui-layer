import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import OndcRoutes from "./router";
import Navbar from "./components/shared/navbar/navbar";
import { CartContext } from "./context/cartContext";
import { useContext } from "react";
import OrderSummary from "./components/application/product-listing/order-summary/orderSummary";

function App() {
  const { cartItems } = useContext(CartContext);
  return (
    <Router>
      <Navbar />
      <div className="playground_without_order_summary">
        <OndcRoutes />
      </div>
    </Router>
  );
}

export default App;
