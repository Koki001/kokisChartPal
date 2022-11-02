import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import CreateChart from "./Components/CreateChart";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateChart />} />
      </Routes>
    </div>
  );
}

export default App;
