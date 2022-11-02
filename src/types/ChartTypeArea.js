import React, { PureComponent } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  BarChart,
  Label,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { GithubPicker } from "react-color";
import useWindowDimensions from "../features/windowSize";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const ChartTypeLine = function () {
  const [fmainData, setFmainData] = useState({
    dataPoints: [],
    xLabel: "",
    yLabel: "",
    data: [],
  });
  const [fchartData, setFChartData] = useState([]);
  const [dataCounter, setDataCounter] = useState([]);
  const [dataNumDropdown, setDataNumDropdown] = useState([]);
  const [xAxisData, setXAxisData] = useState([]);
  const [fchartNames, setFChartNames] = useState([]);
  // const [colorPicker, setColorPicker] = useState({ background: "" });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorButton, setColorButton] = useState([]);

  const [showing, setShowing] = useState(0);
  const colorArray = [
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgrey",
    "darkgreen",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
    "darkslategrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dimgrey",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "gray",
    "grey",
    "green",
    "greenyellow",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgrey",
    "lightgreen",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategray",
    "lightslategrey",
    "lightsteelblue",
    "lightyellow",
    "lime",
    "limegreen",
    "linen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "slategrey",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen",
  ];
  const { height, width } = useWindowDimensions();

  useEffect(function () {
    let pointNumArray = [];
    for (let i = 0; i < 20; i++) {
      pointNumArray.push(i + 1);
    }
    setDataNumDropdown(pointNumArray);
  }, []);

  const colors = ["#ff0000", "#dec120", "#0049ff", "#00ff0c"];

  const handleDataPointNum = function (e) {
    const pointArray = [];
    const dataArray = [...fchartData];

    for (let i = 0; i < Number(e.target.value); i++) {
      pointArray.push(i);

      if (!dataArray.includes(dataArray[i])) {
        dataArray.push({ name: "" });
      }
    }
    for (let x = e.target.value; x < dataArray.length; x++) {
      dataArray.splice(x, dataArray.length - (x - 1));
    }
    setFmainData(function (current) {
      return { ...current, dataPoints: pointArray };
    });
    setFChartData(dataArray);
  };
  const handleXLabel = function (e) {
    setFmainData(function (current) {
      return { ...current, xLabel: e.target.value };
    });
  };
  const handleYLabel = function (e) {
    setFmainData(function (current) {
      return { ...current, yLabel: e.target.value };
    });
  };
  useEffect(
    function () {
      let xAxisDataNames = [];
      for (let i = 0; i < fmainData.dataPoints.length; i++) {
        xAxisDataNames.push({ name: "" });
      }
      setXAxisData([...xAxisDataNames]);
    },
    [fmainData.dataPoints]
  );

  const handleXData = function (e) {
    const updateXDataName = fchartData.slice();

    for (let i = 0; i < Object.entries(fmainData.dataPoints).length; i++) {
      if (`xData${i}` == e.target.id) {
        updateXDataName[i].name = e.target.value;
      }
    }
    setFChartData(updateXDataName);
  };
  const handleDataChange = function (e) {
    const chartCopy = [...fchartData];
    chartCopy[e.target.parentElement.parentElement.parentElement.id][
      `line${e.target.id}`
    ] = Number(e.target.value);
    setFChartData(chartCopy);
  };
  const handleDataLabel = function (e) {
    const updateDataLabel = [...fchartNames];
    for (let i = 0; i < dataCounter.length + 1; i++) {
      if (e.target.id == `line${i}`) {
        updateDataLabel[i].name = e.target.value;
      }
    }
    setFChartNames(updateDataLabel);
  };
  const handleNewLine = function (e) {
    const nameArray = [...fchartNames];
    nameArray.push({ name: "", color: "" });
    let dataArray = [...fchartData];
    let counter = [];
    for (let i = 0; i < dataCounter.length + 1; i++) {
      counter.push(i);
    }
    for (let d = 0; d < dataArray.length; d++) {
      dataArray[d] = { ...dataArray[d], [`line${dataCounter.length}`]: "" };
    }
    setFChartNames(nameArray);
    setDataCounter([...counter]);
    setFChartData(dataArray);
  };
  const handleNextClick = function () {
    if (showing < fchartNames.length - 1) {
      setShowing(showing + 1);
    } else if (showing === fchartNames.length - 1) {
      setShowing(0);
    }
  };
  const handlePrevClick = function () {
    if (showing <= fchartNames.length && showing > 0) {
      setShowing(showing - 1);
    } else if (showing === 0 || showing < 0) {
      setShowing(fchartNames.length - 1);
    }
  };
  const handleChangeComplete = function (e) {
    let colorArr = [...fchartNames];
    colorArr[colorButton].color = e.hex;
    setFChartNames(colorArr);
    setShowColorPicker(false);
  };
  const handleColorOpen = function (e) {
    setColorButton(Number(e.target.name));
    setShowColorPicker(true);
  };

  return (
    <>
      <div className="chartConfig">
        <div className="topChart">
          <div className="selectAndAdd">
            <FormControl
              sx={{ m: 1, minWidth: 130, marginLeft: "0" }}
              size="small"
            >
              <InputLabel id="selectDataPoints">Data Points</InputLabel>
              <Select
                labelId="selectDataPoints"
                id="selectDataPoints"
                label="Data Points"
                onChange={handleDataPointNum}
              >
                <MenuItem value={0}>0</MenuItem>
                {dataNumDropdown.map(function (option, index) {
                  return (
                    <MenuItem key={index + 1} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              onClick={handleNewLine}
              variant="contained"
              disabled={fmainData.dataPoints.length > 0 ? false : true}
            >
              Add data
            </Button>
          </div>
          <TextField
            onChange={handleXLabel}
            name={"xAxisLabel"}
            value={fmainData.xLabel}
            id="standard-basic"
            label="X-Axis Label"
            variant="standard"
          />
          <TextField
            onChange={handleYLabel}
            name={"yAxisLabel"}
            value={fmainData.yLabel}
            id="standard-basic"
            label="Y-Axis Label"
            variant="standard"
          />
        </div>
        <div className="dataLabelTitle">
          <h4>Data Title</h4>

          {showColorPicker === true ? (
            <div className="colorPicker">
              <GithubPicker
                triangle="hide"
                width="100%"
                colors={colorArray}
                onChangeComplete={handleChangeComplete}
              />
            </div>
          ) : null}
          <div className="containedDataName">
            {dataCounter.map(function (line, index) {
              return (
                <div key={`yeah${index}`} className="newLine">
                  <button
                    style={{ backgroundColor: `${fchartNames[index].color}` }}
                    name={index}
                    onClick={handleColorOpen}
                  ></button>
                  <TextField
                    sx={{
                      "& .MuiInputBase-input": {
                        padding: "2px 12px",
                        minWidth: "50px",
                      },
                    }}
                    key={line + index}
                    id={`line${index.toString()}`}
                    onChange={handleDataLabel}
                    placeholder={`Data ${index + 1} Title`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {dataCounter.length !== 0 && fmainData.dataPoints.length > 0 ? (
          <div className="inputsLineContainer">
            <div className="labelArrowContainer">
              {dataCounter.length > 1 && (
                <Button
                  onClick={handlePrevClick}
                  variant="outlined"
                  startIcon={<KeyboardArrowLeftIcon />}
                  style={{
                    minWidth: "30px",
                    padding: "0 10px",
                    "& span": {
                      margin: "0",
                    },
                  }}
                ></Button>
              )}
              <h4>
                {fchartNames[showing].name
                  ? fchartNames[showing].name
                  : `No Name`}
              </h4>
              {dataCounter.length > 1 && (
                <Button
                  onClick={handleNextClick}
                  variant="outlined"
                  startIcon={<KeyboardArrowRightIcon />}
                  style={{
                    minWidth: "30px",
                    padding: "0 10px",
                    "& span": {
                      margin: "0",
                    },
                  }}
                ></Button>
              )}
            </div>
            <div
              className="containedDivBorder"
              style={{
                border: `2px solid ${fchartNames[showing].color}`,
                borderRadius: "5px",
              }}
            >
              <div className="containedInputs">
                <div className="xAxis">
                  {Object.entries(fmainData.dataPoints).map(function (
                    point,
                    index
                  ) {
                    return (
                      <div
                        className="dataPointInputs"
                        key={`dataPoint${index + 1}`}
                      >
                        <TextField
                          sx={{
                            "& .MuiInputBase-input": {
                              padding: "2px 12px",
                              minWidth: "30px",
                            },
                          }}
                          id={`xData${index.toString()}`}
                          onChange={handleXData}
                          placeholder={`Point ${index + 1} Label`}
                          value={fchartData[index].name}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="yAxis">
                  {dataCounter.map(function (line, lineIndex) {
                    if (showing === lineIndex) {
                      return (
                        <div
                          className="containedInputsY"
                          key={`yInputs${lineIndex}`}
                        >
                          {Object.entries(fmainData.dataPoints).map(function (
                            point,
                            index
                          ) {
                            return (
                              <div
                                className="dataPointInputs"
                                key={`data${index}`}
                                id={index}
                              >
                                <TextField
                                  sx={{
                                    "& .MuiInputBase-input": {
                                      padding: "2px 12px",
                                      minWidth: "30px",
                                      textAlign: "center",
                                    },
                                  }}
                                  id={lineIndex.toString()}
                                  onChange={handleDataChange}
                                  placeholder={`Data Point ${index + 1} Value`}
                                  value={fchartData[index][`line${lineIndex}`]}
                                />
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <ResponsiveContainer
        width="100%"
        height="70%"
        className="chartMainContainer"
      >
        <BarChart
          // width={width - 50}
          // height={500}
          data={fchartData}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{
              value: fmainData.xLabel,
              position: "bottom",
              className: "xAxisLabel",
              offset: 15,
            }}
          />
          <YAxis
            domain={[0, "dataMax"]}
            label={{
              value: fmainData.yLabel,
              angle: -90,
              position: "insideLeft",
              className: "yAxisLabel",
            }}
          />
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="center"
            height={36}
            iconSize="14"
            iconType={"circle"}
          />
          {dataCounter.map(function (e, index) {
            return (
              <Bar
                key={`line${index}`}
                strokeWidth={2}
                type="monotone"
                name={
                  fchartNames[index].name
                    ? fchartNames[index].name
                    : `Data ${index + 1}`
                }
                dataKey={`line${index}`}
                fill={
                  fchartNames[index].color
                    ? fchartNames[index].color
                    : "#000000"
                }
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ChartTypeLine;
