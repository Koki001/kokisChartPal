// CreateChart.js

import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectedType } from "../slices/chartMainSlice";
import ChartTypeLine from "../types/ChartTypeLine";
import ChartTypeArea from "../types/ChartTypeArea";
import ChartTypeBar from "../types/ChartTypeBar";
import ChartTypePie from "../types/ChartTypePie";
import Button from "@mui/material/Button";
import Navigation from "./Navigation";

const CreateChart = function () {
  const [chartType, setChartType] = useState("");
  // const dispatch = useDispatch();

  const chart = useSelector(function (state) {
    return state.chart;
  });

  useEffect(function () {
    setChartType(chart);
  }, []);

  // const handleGoBack = function () {
  //   dispatch(selectedType("default"));
  // };

  return (
    <div className="createChart">
      <Navigation />
      <div className="wrapper">
        {/* <Link to={"/"}>
          <Button color="warning" sx={{padding: "0", marginTop: "10px"}} variant="outlined" onClick={handleGoBack}>back</Button>
        </Link> */}
        <div className="chartContainer">
          {chartType.value === "line" ? (
            <ChartTypeLine />
          ) : chartType.value === "area" ? (
            <ChartTypeArea />
          ) : chartType.value === "bar" ? (
            <ChartTypeBar />
          ) : 
          // : chartType.value === "pie" ? (
          //   <ChartTypePie />
          // )
          null}
        </div>
      </div>
    </div>
  );
};

export default CreateChart;
