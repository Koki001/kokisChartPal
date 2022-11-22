// HomePage.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedType } from "../features/chartTypeSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

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
  console.log(selectedChart);
  return (
    <div className="wrapper mainContainer">
      {/* <svg viewBox="0 0 1400 200">
        <symbol id="s-text">
          <text text-anchor="middle" x="50%" y="35%" dy=".35em">
            Koki's Chart Emporium
          </text>
        </symbol>
        <use class="text" xlinkHref="#s-text"></use>
        <use class="text" xlinkHref="#s-text"></use>
        <use class="text" xlinkHref="#s-text"></use>
        <use class="text" xlinkHref="#s-text"></use>
        <use class="text" xlinkHref="#s-text"></use>
      </svg> */}
      <svg className="svgTitle" viewBox="0 0 2220 200">
        <text x="50%" y="50%" dy=".35em" textAnchor="middle">
          The Chart Emporium
        </text>
      </svg>
      <div className="chartTypes">
        <FormControl variant="standard" fullWidth>
          <InputLabel id="selectDropdown">Select chart type</InputLabel>
          <Select
            labelId="selectDropdown"
            id="selectWelcome"
            value={selectedChart !== "default" ? selectedChart : ""}
            label="Chart list type"
            onChange={handleChartType}
          >
            <MenuItem disabled value="default"></MenuItem>
            <MenuItem value="line">Line</MenuItem>
            <MenuItem value="area">Area</MenuItem>
            <MenuItem value="bar">Bar</MenuItem>
            <MenuItem disabled value="composed">
              Composed
            </MenuItem>
            <MenuItem disabled value="scatter">
              Scatter
            </MenuItem>
            <MenuItem disabled value="pie">
              Pie
            </MenuItem>
            <MenuItem disabled value="radar">
              Radar
            </MenuItem>
            <MenuItem disabled value="radialBar">
              Radial Bar
            </MenuItem>
            <MenuItem disabled value="treeMap">
              Tree Map
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      {selectedChart !== "default" && (
        <div className="chartExample">
          {/* <h2>Chart example:</h2> */}
          <div className="chartExampleText">
            {selectedChart === "line" ? (
              <div className="lineExample">
                <div className="lineText">
                  <h3>Usage example:</h3>
                  <p>
                    Best used to showcase a continuous dataset, or multiple
                    datasets over the same period of time. It's a simple and
                    effective way to compare different groups of data over short
                    and long periods of time, especially when the changes in
                    data are smaller.{" "}
                  </p>
                </div>
                <div className="buttonLink">
                  <Link to={"/create"}>
                    <Button variant="outlined">Use this type</Button>
                  </Link>
                </div>
              </div>
            ) : selectedChart === "area" ? (
              <div className="lineExample">
                <div className="lineText">
                  <h3>Usage example:</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas in nobis saepe nemo molestiae laborum minima! Ad, autem. Odio quidem officiis cupiditate adipisci expedita quas, eius impedit eveniet dolorem ipsa.{" "}
                  </p>
                </div>
                <div className="buttonLink">
                  <Link to={"/create"}>
                    <Button variant="outlined">Use this type</Button>
                  </Link>
                </div>
              </div>
            ) : selectedChart === "bar" ? (
              <div className="lineExample">
                <div className="lineText">
                  <h3>Usage example:</h3>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi natus unde tempore, magni at deserunt obcaecati perspiciatis fugit numquam amet accusantium non quaerat voluptatum, consequuntur ea quasi laborum a facilis.{" "}
                  </p>
                </div>
                <div className="buttonLink">
                  <Link to={"/create"}>
                    <Button variant="outlined">Use this type</Button>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
          <div className="chartExampleImage">
            <img
              src={`./assets/chartSelectTypes/${selectedChart}.png`}
              alt=""
            />
          </div>
        </div>
      )}
      {/* {selectedChart !== "default" && (
        <Link to={"/create"}>
          <Button variant="outlined">Use this type</Button>
        </Link>
      )} */}
    </div>
  );
};

export default HomePage;
