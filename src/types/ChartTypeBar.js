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
    barType: "simple",
    showBarVal: true,
    showGrid: true,
    showLabels: true,
    rotateLabels: false,
    showLegend: true,
    connectNull: false,
    tickNumber: 10,
  });
  const [chartImage, setChartImage] = useState("");
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

  const handleShowBarVal = function (e) {
    setOptions(function (current) {
      return { ...current, showBarVal: e.target.checked };
    });
  };
  const handleRotateLabels = function (e) {
    setOptions(function (current) {
      return { ...current, rotateLabels: e.target.checked };
    });
  };
  const handleShowLegend = function (e) {
    setOptions(function (current) {
      return { ...current, showLegend: e.target.checked };
    });
  };
  const handleLineType = function (e) {
    setOptions(function (current) {
      return { ...current, barType: e.target.value };
    });
  };
  // const handleNullValues = function (e) {
  //   setOptions(function (current) {
  //     return { ...current, connectNull: e.target.checked };
  //   });
  // };
  const handleTickChange = function (e) {
    setOptions(function (current) {
      return {
        ...current,
        tickNumber: e.target.value > 20 ? "20" : e.target.value,
      };
    });
  };
  const handleInfoTickOpen = function (e) {
    setInfoTickEl(e.currentTarget);
  };
  const handleInfoTickClose = function (e) {
    setInfoTickEl(null);
  };
  const handleInfoRotateOpen = function (e) {
    setInfoRotateEl(e.currentTarget);
  };
  const handleInfoRotateClose = function (e) {
    setInfoRotateEl(null);
  };
  // const handleInfoNullOpen = function (e) {
  //   setInfoNullEl(e.currentTarget);
  // };
  // const handleInfoNullClose = function (e) {
  //   setInfoNullEl(null);
  // };
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
              />
              <TextField
                onChange={handleYLabel}
                name={"yAxisLabel"}
                value={fmainData.yLabel}
                id="standard-basic"
                label="Y-Axis Label"
                variant="outlined"
                sx={{ width: "45%" }}
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
            <div className="labelsOption">
              <p>Show value</p>
              <Switch size="small" onChange={handleShowBarVal} defaultChecked />
            </div>
            <div className="rotateOption">
              <div className="infoPopIconAbsolute">
                <PriorityHighIcon
                  color="warning"
                  aria-describedby={idInfoPop}
                  fontSize={"small"}
                  onClick={handleInfoRotateOpen}
                />
                <Popover
                  id={idInfoPop}
                  open={openInfoRotate}
                  anchorEl={infoRotateEl}
                  onClose={handleInfoRotateClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography
                    sx={{
                      backgroundColor: "#357fca",
                      color: "white",
                      padding: "5px 10px 5px 10px",
                      fontSize: "15px",
                      width: "230px",
                    }}
                  >
                    Rotates labels along the X-Axis at an angle. This also
                    causes each space separated word to go in the next line. If
                    the labels are written before this option is selected, you
                    must interact with the label input for the word line break
                    to take effect (Like adding an empty space in the desired
                    input).
                  </Typography>
                </Popover>
              </div>
              <p>Rotate labels</p>
              <Switch size="small" onChange={handleRotateLabels} />
            </div>
            <div className="legendOption">
              <p>Show legend</p>
              <Switch size="small" onChange={handleShowLegend} defaultChecked />
            </div>
            <div className="lineOption">
              <p>Bar thickness</p>
              <Box sx={{ width: 70 }}>
                <Slider
                  aria-label="Bar thickness"
                  defaultValue={2}
                  step={3}
                  marks
                  min={1}
                  max={21}
                  onChange={handleLineThickness}
                  size="small"
                />
              </Box>
            </div>
            <div className="lineTicks">
              <div className="infoPopIconAbsolute">
                <PriorityHighIcon
                  color="warning"
                  aria-describedby={idInfoPop}
                  fontSize={"small"}
                  onClick={handleInfoTickOpen}
                />
                <Popover
                  id={idInfoPop}
                  open={openInfoTick}
                  anchorEl={infoTickEl}
                  onClose={handleInfoTickClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography
                    sx={{
                      backgroundColor: "#357fca",
                      color: "white",
                      padding: "5px 10px 5px 10px",
                      fontSize: "15px",
                      width: "230px",
                    }}
                  >
                    Sets the number of intervals on the Y-Axis (vertical chart)
                    or X-Axis (horizontal chart). Current maximum value is 20.
                  </Typography>
                </Popover>
              </div>
              <p>Tick count</p>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  onChange={handleTickChange}
                  placeholder={"10"}
                  id="filled-basic"
                  variant="filled"
                  type={"number"}
                  InputProps={{
                    inputProps: {
                      max: 20,
                      min: 1,
                    },
                  }}
                  value={options.tickNumber > 20 ? "20" : options.tickNumber}
                />
              </Box>
            </div>
            <div className="lineType">
              {/* <p id="lineTypeRadio" sx={{ color: "black" }}>
                Line Type:
              </p> */}
              <RadioGroup
                onChange={handleLineType}
                // row={true}
                aria-labelledby="lineTypeRadio"
                defaultValue="simple"
                name="radio-buttons-group"
                row
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 14,
                  },
                  "& .MuiFormControlLabel-root": {
                    marginTop: 0,
                  },
                  "& .MuiButtonBase-root": {
                    padding: "1px",
                  },
                }}
              >
                <FormControlLabel
                  value="simple"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 22,
                        },
                      }}
                    />
                  }
                  label="Simple"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="stacked"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 22,
                        },
                      }}
                    />
                  }
                  label="Stacked"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="vertical"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 22,
                        },
                      }}
                    />
                  }
                  // should change all
                  label="Horizontal"
                  labelPlacement="start"
                />
              </RadioGroup>
            </div>
            <div className="saveChart">
              <Button
                sx={{
                  padding: "2px 10px",
                  fontSize: "13px",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
                variant="outlined"
                onClick={handleSaveChart}
              >
                Download chart
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      <ResponsiveContainer
        width={"100%"}
        height={
          options.barType === "vertical" && fmainData.dataPoints.length >= 10
            ? "100%"
            : options.barType === "vertical" &&
              fmainData.dataPoints.length > 5 &&
              fmainData.dataPoints.length < 10
            ? "75%"
            : options.barType === "vertical" &&
              fchartNames.length > 2 &&
              fmainData.dataPoints.length > 2
            ? "90%"
            : "65%"
        }
        className="chartMainContainer"
      >
        <BarChart
          layout={options.barType === "vertical" ? "vertical" : "horizontal"}
          barGap={21}
          ref={chartRef}
          data={fchartData}
          margin={{
            top: 10,
            right: 50,
            left: options.showLabels === true ? 20 : 0,
            bottom: 50,
          }}
        >
          {options.showGrid === true && <CartesianGrid strokeDasharray="3 3" />}
          {options.barType === "vertical" ? (
            <>
              <YAxis
                type="category"
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
                domain={[0, `auto`]}
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
                label={
                  options.showBarVal === true && options.barType !== "vertical"
                    ? { position: "top", offset: "5" }
                    : options.showBarVal === true &&
                      options.barType === "vertical"
                    ? { position: "right", offset: "5" }
                    : null
                }
                stackId={options.barType === "stacked" ? "stacked" : null}
                barSize={options.lineThickness * 5}
                key={`line${index}`}
                type={options.barType}
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
                connectNulls={options.connectNull}
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
    </>
  );
};

export default ChartTypeLine;
