import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter } from "react-router-dom";
import MyBootcamps from "./Pages/MyBootcamps";
import BootcampPage from "./Pages/BootcampPage";
import Addbootcamp from "./Pages/Addbootcamp";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/home" exact element={<Dashboard />} />
          <Route path="/mybootcamps" exact element={<MyBootcamps />} />
          <Route path="/bootcamps/:id" exact element={<BootcampPage />} />
          <Route path="/addbootcamp" exact element={<Addbootcamp />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
