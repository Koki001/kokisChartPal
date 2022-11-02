// HomePage.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedType } from "../features/chartTypeSlice";

const HomePage = function () {
  const [selectedChart, setSelectedChart] = useState("default");
  const dispatch = useDispatch();
  const chart = useSelector(function (state) {
    return state.chart;
  });

  const handleChartType = function (event) {
    setSelectedChart(event.target.value);
    dispatch(selectedType(event.target.value));
  };

  return (
    <div className="wrapper">
      <h1>Welcome to ChartPal</h1>
      <div className="chartTypes">
        <label htmlFor="charts">Please select chart type:</label>
        <select
          onChange={handleChartType}
          name="charts"
          id="charts"
          value={selectedChart}
        >
          <option value="default"></option>
          <option value="line">Line</option>
          <option value="area">Area</option>
          <option value="bar">Bar</option>
          <option value="composed">Composed</option>
          <option value="scatter">Scatter</option>
          <option value="pie">Pie</option>
          <option value="radar">Radar</option>
          <option value="radialBar">Radial Bar</option>
          <option value="treeMap">Tree Map</option>
        </select>
      </div>
      {selectedChart !== "default" && (
        <div className="chartExample">
          <h2>Chart example:</h2>
          <div className="chartExampleImage">
            <img
              src={`./assets/chartSelectTypes/${selectedChart}.png`}
              alt=""
            />
          </div>
          <Link to={"/create"}><button>Use this type</button></Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
