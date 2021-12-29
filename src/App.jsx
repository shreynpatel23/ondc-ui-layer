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
      <div
        className={
          cartItems.length > 0
            ? "playground_with_order_summary"
            : "playground_without_order_summary"
        }
      >
        <OndcRoutes />
      </div>
      {cartItems.length > 0 && <OrderSummary />}
    </Router>
  );
}

export default App;
