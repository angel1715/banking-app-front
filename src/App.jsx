import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./banking/Home";
import Register from "./banking/Register";
import Login from "./banking/Login";
import Dashboard from "./banking/Dashboard";
import CardInformation from "./banking/CardInformation";
import AboutUs from "./banking/About";
import Services from "./banking/Services";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/CardInformation" element={<CardInformation />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/services" element={<Services />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
