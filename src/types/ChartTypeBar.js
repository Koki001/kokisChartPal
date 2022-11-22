import React, { PureComponent } from "react";
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
import { SketchPicker } from "react-color";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import Slider from "@mui/material/Slider";
import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import Swal from "sweetalert2";

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
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorButton, setColorButton] = useState([]);
  const [options, setOptions] = useState({
    lineThickness: 2,
    lineType: "monotone",
    showGrid: true,
    showLabels: true,
    connectNull: false,
  });
  const [chartImage, setChartImage] = useState("");
  const [showing, setShowing] = useState(0);
  const chartRef = useRef();
  // const { height, width } = useWindowDimensions();

  useEffect(function () {
    let pointNumArray = [];
    for (let i = 0; i < 20; i++) {
      pointNumArray.push(i + 1);
    }
    setDataNumDropdown(pointNumArray);
  }, []);

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
  const handleRemoveLine = function (e) {
    //   console.log(e.target.value)
    //   console.log(fchartNames)
    //   const nameArray = [...fchartNames];
    //   nameArray.splice(Number(e.target.value), 1)
    //   setFChartNames(nameArray)
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
    setShowColorPicker(false);
  };
  const handleColorOpen = function (e) {
    setColorButton(Number(e.target.name));
    setShowColorPicker(true);
  };
  const handleColorSlider = function (e, color) {
    let colorArr = [...fchartNames];
    colorArr[colorButton].color = e.hex;
    setFChartNames(colorArr);
  };
  const handleLineThickness = function (e) {
    setOptions(function (current) {
      return { ...current, lineThickness: e.target.value };
    });
  };

  const handleShowGrid = function (e) {
    setOptions(function (current) {
      return { ...current, showGrid: e.target.checked };
    });
  };
  const handleShowLabels = function (e) {
    setOptions(function (current) {
      return { ...current, showLabels: e.target.checked };
    });
  };
  const handleLineType = function (e) {
    setOptions(function (current) {
      return { ...current, lineType: e.target.value };
    });
  };
  const handleNullValues = function (e) {
    setOptions(function (current) {
      return { ...current, connectNull: e.target.checked };
    });
  };
  const inputOptions = {
    white: "White",
    transparent: "Transparent",
  };
  const handleSaveChart = function (e) {
    if (chartRef.current === null) {
      return;
    } else {
      const { value: color } = Swal.fire({
        showCancelButton: true,
        showConfirmButton: true,
        title: "Select background color",
        input: "radio",
        inputOptions: inputOptions,
        inputValidator: (value) => {
          console.log(value);
          if (!value) {
            return "You need to choose something!";
          } else {
            toPng(chartRef.current.container, {
              cacheBust: true,
              backgroundColor: value,
            })
              .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "my-image-name.png";
                link.href = dataUrl;
                link.click();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        },
      });
    }
  };
  // const tickArray = [
  //   0,
  //   Math.trunc("dataMax" / 4),
  //   Math.trunc("dataMax" / 2),
  //   Math.trunc((3 * "dataMax") / 4),
  //   "dataMax",
  // ];
  return (
    <>
      <div className="chartConfig wrapper">
        <div className="topChart">
          <div className="selectAndAdd">
            {dataNumDropdown.length > 1 ? (
              <FormControl
                sx={{ m: 1, minWidth: 90, marginLeft: "0" }}
                size="small"
              >
                <InputLabel id="selectDataPoints">Data Points</InputLabel>
                <Select
                  labelId="selectDataPoints"
                  id="selectDataPoints"
                  label="Data Points"
                  onChange={handleDataPointNum}
                  defaultValue={0}
                >
                  <MenuItem value={"0"}>0</MenuItem>
                  {dataNumDropdown.map(function (option, index) {
                    return (
                      <MenuItem key={index + 1} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            ) : null}
            <Button
              onClick={handleNewLine}
              variant="contained"
              disabled={fmainData.dataPoints.length > 0 ? false : true}
            >
              Add data
            </Button>
          </div>
          <div className="dataLabelTitle">
            {showColorPicker === true ? (
              <div className="colorPicker">
                <SketchPicker
                  triangle="hide"
                  color={fchartNames[colorButton].color}
                  onChange={handleColorSlider}
                  width="auto"
                />
                <Button
                  onClick={handleChangeComplete}
                  variant="contained"
                  color="error"
                >
                  Exit color picker
                </Button>
              </div>
            ) : null}
            <div className="containedDataName">
              {dataCounter.map(function (line, index) {
                return (
                  <div key={`yeah${index}`} className="newLine">
                    <button
                      style={
                        fchartNames[index].color
                          ? {
                              backgroundColor: `${fchartNames[index].color}`,
                            }
                          : {
                              background:
                                "linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)",
                            }
                      }
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
                      variant="standard"
                      key={line + index}
                      id={`line${index.toString()}`}
                      onChange={handleDataLabel}
                      placeholder={`Dataset ${index + 1} Title`}
                    />
                    <IconButton
                      value={index}
                      onClick={handleRemoveLine}
                      size="small"
                      color="primary"
                      aria-label="Remove data group"
                    >
                      <ClearIcon fontSize="10px" />
                    </IconButton>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {dataCounter.length !== 0 && fmainData.dataPoints.length > 0 ? (
          <div className="inputsLineContainer">
            <div className="labelsXY">
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
                border: `1px solid ${fchartNames[showing].color}`,
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
                          variant="filled"
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
                                  type={"number"}
                                  onWheel={(e) => e.target.blur()}
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
                                  variant="standard"
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
        {dataCounter.length !== 0 && fmainData.dataPoints.length > 0 ? (
          <div className="chartSettings">
            <div className="gridOption">
              <p>Show grid</p>
              <Switch size="small" defaultChecked onChange={handleShowGrid} />
            </div>
            <div className="labelsOption">
              <p>Show labels</p>
              <Switch size="small" onChange={handleShowLabels} defaultChecked />
            </div>
            <div className="lineNullOption">
              <p>Connect nulls</p>
              <Switch size="small" onChange={handleNullValues} />
            </div>
            <div className="lineOption">
              <p>Bar thickness</p>
              <Box sx={{ width: 70 }}>
                <Slider
                  aria-label="Bar thickness"
                  defaultValue={2}
                  step={1}
                  marks
                  min={1}
                  max={8}
                  onChange={handleLineThickness}
                  size="small"
                />
              </Box>
            </div>
            <div className="saveChart">
              <Button variant="outlined" onClick={handleSaveChart}>
                Download chart
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      <ResponsiveContainer
        width="100%"
        height="65%"
        className="chartMainContainer"
      >
        <BarChart
          ref={chartRef}
          data={fchartData}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          {options.showGrid === true && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis
            dataKey="name"
            label={
              options.showLabels === true && {
                value: fmainData.xLabel,
                position: "bottom",
                className: "xAxisLabel",
                offset: 15,
              }
            }
            tick={{ dy: 5, fontSize: "14px", fontWeight: "bold" }}
          />
          <YAxis
            domain={[0, "auto"]}
            label={
              options.showLabels === true && {
                value: fmainData.yLabel,
                angle: -90,
                position: "insideLeft",
                className: "yAxisLabel",
                offset: -5,
              }
            }
            tick={{ dx: -5, fontSize: "14px", fontWeight: "bold" }}
            tickCount={10}
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
                barSize={options.lineThickness * 10}
                key={`line${index}`}
                // type={options.lineType}
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
                stroke={
                  fchartNames[index].color
                    ? fchartNames[index].color
                    : "#000000"
                }
                connectNulls={options.connectNull}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ChartTypeLine;
