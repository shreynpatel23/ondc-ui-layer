import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "./api/firebase-init";
import OndcRoutes from "./router";
import Navbar from "./components/shared/navbar/navbar";

function App() {
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
