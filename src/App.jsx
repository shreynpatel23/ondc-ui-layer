import "./App.css";
import OndcRoutes from "./router";
import Navbar from "./components/shared/navbar/navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="playground">
        <OndcRoutes />
      </div>
    </div>
  );
}

export default App;
