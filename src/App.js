import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import NewDeal from "./components/NewDeal/NewDeal";
import CardDetail from "./components/CardDetail/CardDetail";
import Dokans from "./components/DokanEntry/DokanEntry";
import DokanCardDetails from "./components/DokanCardDetails/DokanCardDetails";
import NewDokan from "./components/NewDokan/NewDokan";
import Borrowed from "./components/Borrowed/Borrowed";

require("dotenv").config();
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-deal" element={<NewDeal />} />
          <Route path="/card-detail/:id" element={<CardDetail />} />
          <Route path="/dokans" element={<Dokans />} />
          <Route path="/dokan-details" element={<DokanCardDetails />} />
          <Route path="/new-dokan" element={<NewDokan />} />
          <Route path="/borrow" element={<Borrowed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
