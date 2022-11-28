import React, { PureComponent } from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  Area,
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
import { useRef } from "react";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import Swal from "sweetalert2";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { height } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedType,
  dataPointNum,
  addXTitle,
  addYTitle,
  addChartData,
  addDataset,
} from "../slices/chartMainSlice";
import { current } from "@reduxjs/toolkit";

const ChartTypeLine = function () {
  const options = useSelector(function (state) {
    return state.options;
  });
  const chart = useSelector(function (state) {
    return state.chart;
  });
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
  // const [options, setOptions] = useState({
  //   lineThickness: 2,
  //   barType: "simple",
  //   showBarVal: true,
  //   showGrid: true,
  //   showLabels: true,
  //   rotateLabels: false,
  //   showLegend: true,
  //   connectNull: false,
  //   tickNumber: 10,
  // });
  const [chartCalc, setChartCalc] = useState(0);
  const [showing, setShowing] = useState(0);
  const [downloadAlert, setDownloadAlert] = useState(false);
  const [infoTickEl, setInfoTickEl] = useState(null);
  const [infoNullEl, setInfoNullEl] = useState(null);
  const [infoRotateEl, setInfoRotateEl] = useState(null);
  const chartRef = useRef();
  // const { height, width } = useWindowDimensions();
  const openInfoTick = Boolean(infoTickEl);
  const openInfoNull = Boolean(infoNullEl);
  const openInfoRotate = Boolean(infoRotateEl);
  const idInfoPop = openInfoTick
    ? "info-popup-tick"
    : openInfoNull
    ? "info-popup-null"
    : openInfoRotate
    ? "info-popup-rotate"
    : null;
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
    setChartCalc(pointArray.length);
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
  // console.log(fchartNames.length)
  console.log(options.barThickness);
  // const handleLineThickness = function (e) {
  //   setOptions(function (current) {
  //     return { ...current, lineThickness: e.target.value };
  //   });
  // };

  // const handleShowGrid = function (e) {
  //   setOptions(function (current) {
  //     return { ...current, showGrid: e.target.checked };
  //   });
  // };
  // const handleShowLabels = function (e) {
  //   setOptions(function (current) {
  //     return { ...current, showLabels: e.target.checked };
  //   });
  // };

  // const handleShowBarVal = function (e) {
  //   setOptions(function (current) {
  //     return { ...current, showBarVal: e.target.checked };
  //   });
  // };
  // const handleRotateLabels = function (e) {
  //   setOptions(function (current) {
  //     return { ...current, rotateLabels: e.target.checked };
  //   });
  // };
  // const handleShowLegend = function (e) {
  //   setOptions(function (current) {
  //     return { ...current, showLegend: e.target.checked };
  //   });
  // };
  // const handleLineType = function (e) {
  //   setOptions(function (current) {
  //     return { ...current, barType: e.target.value };
  //   });
  // };
  // const handleNullValues = function (e) {
  //   setOptions(function (current) {
  //     return { ...current, connectNull: e.target.checked };
  //   });
  // };
  // const handleTickChange = function (e) {
  //   setOptions(function (current) {
  //     return {
  //       ...current,
  //       tickNumber: e.target.value > 20 ? "20" : e.target.value,
  //     };
  //   });
  // };
  // const handleInfoTickOpen = function (e) {
  //   setInfoTickEl(e.currentTarget);
  // };
  // const handleInfoTickClose = function (e) {
  //   setInfoTickEl(null);
  // };
  // const handleInfoRotateOpen = function (e) {
  //   setInfoRotateEl(e.currentTarget);
  // };
  // const handleInfoRotateClose = function (e) {
  //   setInfoRotateEl(null);
  // };
  // const handleInfoNullOpen = function (e) {
  //   setInfoNullEl(e.currentTarget);
  // };
  // const handleInfoNullClose = function (e) {
  //   setInfoNullEl(null);
  // };
  // console.log(options.lineType);
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
              // canvasWidth: 1920,
              // canvasHeight: 1080,
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
  const handleMoreSettings = function () {};
  return (
    <>
      <div className="chartConfig">
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
              variant="outlined"
              disabled={fmainData.dataPoints.length > 0 ? false : true}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                fontWeight: "bold",
              }}
            >
              {fchartNames.length <= 0 ? "New" : "Add"} data
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
            {fchartNames.length > 0 && (
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
                        disabled
                      >
                        <ClearIcon fontSize="10px" />
                      </IconButton>
                    </div>
                  );
                })}
              </div>
            )}
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
                variant="outlined"
                sx={{ width: "45%" }}
                size="small"
              />
              <TextField
                onChange={handleYLabel}
                name={"yAxisLabel"}
                value={fmainData.yLabel}
                id="standard-basic"
                label="Y-Axis Label"
                variant="outlined"
                sx={{ width: "45%" }}
                size="small"
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
                    padding: "0 0 0 10px",
                    "& span": {
                      margin: "0",
                    },
                  }}
                ></Button>
              )}
              <h4
                className={
                  fchartNames[showing].name === "" ? "noName" : "nameFilled"
                }
              >
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
                    padding: "0 0 0 10px",
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
                                  value={
                                    fchartData[index][`line${lineIndex}`] &&
                                    fchartData[index][`line${lineIndex}`]
                                  }
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
      </div>
      <div className="responsiveWrapper">
        <ResponsiveContainer
          width={"100%"}
          height={
            options.lineType === "vertical"
              ? 125 + ((55 + options.barThickness * (fchartNames.length)) * chartCalc + 20)
              : options.lineType !== "vertical" && 500
          }
          className="chartMainContainer"
        >
          <BarChart
            layout={options.lineType === "vertical" ? "vertical" : "horizontal"}
            barGap={5}
            ref={chartRef}
            data={fchartData}
            margin={{
              top: 10,
              right: 50,
              left: options.showLabels === true ? 20 : 0,
              bottom: 50,
            }}
          >
            {options.showGrid === true && (
              <CartesianGrid strokeDasharray="3 3" />
            )}
            {options.lineType === "vertical" ? (
              <>
                <YAxis
                  type="category"
                  // reversed
                  interval={0}
                  dataKey="name"
                  label={
                    options.showLabels === true && {
                      value: fmainData.yLabel,
                      position: "insideLeft",
                      className: "yAxisLabel",
                      angle: -90,
                      offset: -5,
                    }
                  }
                  tick={{
                    dx: -5,
                    fontSize: "14px",
                    width: options.rotateLabels === true ? "50px" : null,
                    wordWrap:
                      options.rotateLabels === true ? "break-word" : "normal",
                    fill: options.showLabels === true ? "black" : "transparent",
                  }}
                />
                <XAxis
                  type="number"
                  // domain={[0, `dataMax`]}
                  domain={[0, "auto"]}
                  angle={options.rotateLabels === true ? -45 : 0}
                  label={
                    options.showLabels === true && {
                      value: fmainData.xLabel,
                      position: "bottom",
                      className: "xAxisLabel",
                      offset: options.rotateLabels === true ? 30 : 15,
                    }
                  }
                  tick={{
                    dy: options.rotateLabels === true ? 20 : 5,
                    fontSize: "14px",
                    fill: options.showLabels === true ? "black" : "transparent",
                  }}
                  tickCount={options.tickNumber}
                />
              </>
            ) : (
              <>
                <XAxis
                  interval={0}
                  type={"category"}
                  angle={options.rotateLabels === true ? -45 : 0}
                  dataKey="name"
                  label={
                    options.showLabels === true && {
                      value: fmainData.xLabel,
                      position: "bottom",
                      className: "xAxisLabel",
                      offset: options.rotateLabels === true ? 30 : 15,
                    }
                  }
                  tick={{
                    dy: options.rotateLabels === true ? 20 : 5,
                    fontSize: "14px",
                    width: options.rotateLabels === true ? "50px" : null,
                    wordWrap:
                      options.rotateLabels === true ? "break-word" : "normal",
                    fill: options.showLabels === true ? "black" : "transparent",
                  }}
                />
                <YAxis
                  // domain={[0, `dataMax`]}
                  domain={[0, 10]}
                  type={"number"}
                  label={
                    options.showLabels === true && {
                      value: fmainData.yLabel,
                      angle: -90,
                      position: "insideLeft",
                      className: "yAxisLabel",
                      offset: -5,
                    }
                  }
                  tick={{
                    dx: -5,
                    fontSize: "14px",
                    fill: options.showLabels === true ? "black" : "transparent",
                  }}
                  tickCount={options.tickNumber}
                />
              </>
            )}
            <Tooltip />
            {options.showLegend === true && (
              <Legend
                verticalAlign="top"
                align="center"
                height={36}
                iconSize="14"
                iconType={"circle"}
              />
            )}
            {dataCounter.map(function (e, index) {
              return (
                <Bar
                  radius={[
                    options.lineType === "monotone" ? 8 : 0,
                    options.lineType === "monotone"
                      ? 8
                      : options.lineType === "vertical"
                      ? 8
                      : 0,
                    options.lineType === "vertical" ? 8 : 0,
                    0,
                  ]}
                  label={
                    options.showBarVal === true &&
                    options.lineType !== "vertical"
                      ? { position: "top", offset: "5" }
                      : options.showBarVal === true &&
                        options.lineType === "vertical"
                      ? {
                          position: "right",
                          offset: "5",
                          fontSize: options.barThickness < 25 ? "12px" : "16px",
                        }
                      : null
                  }
                  stackId={options.lineType === "stacked" ? "stacked" : null}
                  barSize={options.barThickness}
                  key={`line${index}`}
                  type={options.lineType}
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
                  // connectNulls={options.connectNull}
                  stroke={
                    fchartNames[index].color
                      ? fchartNames[index].color
                      : "#000000"
                  }
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ChartTypeLine;
