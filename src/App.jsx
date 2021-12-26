import "./App.css";
import OndcRoutes from "./router";
import Navbar from "./components/shared/navbar/navbar";
import { CartContextProvider } from "./context/cartContext";

function App() {
  return (
    <CartContextProvider>
      <Navbar />
      <div className="playground">
        <OndcRoutes />
      </div>
    </CartContextProvider>
  );
}

export default App;
