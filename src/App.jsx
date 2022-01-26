import "./App.css";
import Data from "./components/Data";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Data />
      </div>
      <Footer />
    </>
  );
}

export default App;
