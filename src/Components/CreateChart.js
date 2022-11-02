// CreateChart.js

import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectedType } from "../features/chartTypeSlice";
import ChartTypeLine from "../types/ChartTypeLine";
import ChartTypeArea from "../types/ChartTypeArea";

const CreateChart = function () {
  const [chartType, setChartType] = useState("");
  const dispatch = useDispatch();

  const chart = useSelector(function (state) {
    return state.chart;
  });

  useEffect(function () {
    setChartType(chart);
  }, []);

  const handleGoBack = function () {
    dispatch(selectedType("default"));
  };

  return (
    <div className="createChart wrapper">
      <h2>Chart info</h2>
      <Link to={"/"}>
        <button onClick={handleGoBack}>back</button>
      </Link>
      <div className="chartContainer">
        {chartType.value === "line" ? (
          <ChartTypeLine />
        ) : chartType.value === "area" ? (
          <ChartTypeArea />
        ) : null}
      </div>
    </div>
  );
};

export default CreateChart;
