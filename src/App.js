import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import CreateChart from "./Components/CreateChart";
import HomePage from "./Components/HomePage";
import { useSelector } from "react-redux";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const [chart, setChart] = useState("");

  const handleChartLink = function (e) {
    setChart(e);
  };
  return (
    <div className="mainApp">
      <Routes>
        <Route path="/" element={<HomePage type={handleChartLink} />} />
        <Route path={`/${chart}`} element={<CreateChart />} />
      </Routes>
    </div>
  );
}

export default App;
