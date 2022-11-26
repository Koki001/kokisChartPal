// Navigation.js

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectedType } from "../features/chartTypeSlice";
import Button from "@mui/material/Button";

const Navigation = function () {
  const dispatch = useDispatch();
  const chart = useSelector(function (state) {
    return state.chart;
  });
  const chartOptions = useSelector(function(state){
    return state.options
  })
  // console.log(chartOptions)
  const handleGoBack = function () {
    dispatch(selectedType("default"));
  };
  return (
    <nav className="navMain">
      <div className="navInner">
        <Link to={"/"}>
          <Button
            className="navBack"
            color="warning"
            sx={{ padding: "0" }}
            variant="outlined"
            onClick={handleGoBack}
          >
            back
          </Button>
        </Link>
        <p className="navChartType">
          Chart type: <span>{chart.value}</span>
        </p>
        <Button
          color="warning"
          sx={{ padding: "0", visibility: "hidden" }}
          variant="outlined"
          disabled
        >
          stuff
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
