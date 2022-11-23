// CreateChart.js

import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectedType } from "../features/chartTypeSlice";
import ChartTypeLine from "../types/ChartTypeLine";
import ChartTypeArea from "../types/ChartTypeArea";
import ChartTypeBar from "../types/ChartTypeBar";
import ChartTypePie from "../types/ChartTypePie";

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
    <div className="createChart">
      <div className="wrapper">
        <Link to={"/"}>
          <button onClick={handleGoBack}>back</button>
        </Link>
        <div className="chartContainer">
          {chartType.value === "line" ? (
            <ChartTypeLine />
          ) : chartType.value === "area" ? (
            <ChartTypeArea />
          ) : chartType.value === "bar" ? (
            <ChartTypeBar />
          )
          // : chartType.value === "pie" ? (
          //   <ChartTypePie />
          // )
          : null}
        </div>
      </div>
    </div>
  );
};

export default CreateChart;
