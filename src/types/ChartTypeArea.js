import React, { PureComponent } from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  AreaChart,
  Label,
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
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { toPng } from "html-to-image";
import Swal from "sweetalert2";
import DownloadIcon from "@mui/icons-material/Download";
import {
  selectedType,
  dataPointNum,
  addXTitle,
  addYTitle,
  addChartData,
  addDataset,
} from "../slices/chartMainSlice";

const ChartTypeLine = function () {
  const [fmainData, setFmainData] = useState({
    dataPoints: [],
    xTitle: "",
    yTitle: "",
    data: [],
    dataset: [],
  });
  const [dataCounter, setDataCounter] = useState([]);
  const [dataNumDropdown, setDataNumDropdown] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorButton, setColorButton] = useState([]);
  const chartRef = useRef();
  const [showing, setShowing] = useState(0);

  const options = useSelector(function (state) {
    return state.options;
  });
  const chart = useSelector(function (state) {
    return state.chart;
  });
  const test = [
    { pointName: "L1", line0: [1, 5] },
    { pointName: "L2", line0: [2, 4] },
  ];
  console.log(fmainData);
  useEffect(function () {
    let pointNumArray = [];
    for (let i = 0; i < 20; i++) {
      pointNumArray.push(i + 1);
    }
    setDataNumDropdown(pointNumArray);
  }, []);
  const dispatch = useDispatch();
  const handleDataPointNum = function (e) {
    const pointArray = [];
    const dataArray = [...fmainData.data];

    for (let i = 0; i < Number(e.target.value); i++) {
      pointArray.push(i);

      if (!dataArray.includes(dataArray[i])) {
        dataArray.push({ pointName: "" });
      }
    }
    for (let x = e.target.value; x < dataArray.length; x++) {
      dataArray.splice(x, dataArray.length - (x - 1));
    }
    setFmainData(function (current) {
      return { ...current, dataPoints: pointArray };
    });
    setFmainData(function (current) {
      return { ...current, data: [...dataArray] };
    });
  };
  const handleXLabel = function (e) {
    setFmainData(function (current) {
      return { ...current, xTitle: e.target.value };
    });
  };
  const handleYLabel = function (e) {
    setFmainData(function (current) {
      return { ...current, yTitle: e.target.value };
    });
  };
  const handlePointLabel = function (e) {
    const updatePointLabel = [...fmainData.data];

    for (let i = 0; i < Object.entries(fmainData.dataPoints).length; i++) {
      if (`xData${i}` == e.target.id) {
        updatePointLabel[i].pointName = e.target.value;
      }
    }
    setFmainData(function (current) {
      return { ...current, data: [...updatePointLabel] };
    });
  };
  const handleDataChange = function (e) {
    const chartCopy = [...fmainData.data];
    chartCopy[e.target.parentElement.parentElement.parentElement.id][
      `line${e.target.id}`
    ] = Number(e.target.value);

    setFmainData(function (current) {
      return { ...current, data: [...chartCopy] };
    });
  };
  const handleDataLabel = function (e) {
    const updateDataLabel = [...fmainData.dataset];
    for (let i = 0; i < dataCounter.length + 1; i++) {
      if (e.target.id == `line${i}`) {
        updateDataLabel[i].name = e.target.value;
      }
    }
    setFmainData(function (current) {
      return { ...current, dataset: [...updateDataLabel] };
    });
  };
  const handleNewDataset = function (e) {
    const nameArray = [...fmainData.dataset];
    nameArray.push({ name: "", color: "" });
    let dataArray = [...fmainData.data];
    let counter = [];
    for (let i = 0; i < dataCounter.length + 1; i++) {
      counter.push(i);
    }
    for (let d = 0; d < dataArray.length; d++) {
      dataArray[d] = { ...dataArray[d], [`line${dataCounter.length}`]: "" };
    }
    setDataCounter([...counter]);
    setFmainData(function (current) {
      return { ...current, data: [...dataArray], dataset: [...nameArray] };
    });
  };
  const handleRemoveLine = function (e) {};
  const handleNextClick = function () {
    if (showing < fmainData.dataset.length - 1) {
      setShowing(showing + 1);
    } else if (showing === fmainData.dataset.length - 1) {
      setShowing(0);
    }
  };
  const handlePrevClick = function () {
    if (showing <= fmainData.dataset.length && showing > 0) {
      setShowing(showing - 1);
    } else if (showing === 0 || showing < 0) {
      setShowing(fmainData.dataset.length - 1);
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
    let colorArr = [...fmainData.dataset];
    colorArr[colorButton].color = e.hex;
    setFmainData(function (current) {
      return { ...current, dataset: [...colorArr] };
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
              onClick={handleNewDataset}
              variant="outlined"
              disabled={fmainData.dataPoints.length > 0 ? false : true}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                fontWeight: "bold",
              }}
            >
              {fmainData.dataset.length <= 0 ? "New" : "Add"} data
            </Button>
            {fmainData.dataset.length > 0 && (
              <Button
                sx={{
                  padding: "2px 10px",
                  fontSize: "13px",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
                variant="outlined"
                onClick={handleSaveChart}
              >
                <DownloadIcon />
              </Button>
            )}
          </div>
          <div className="dataLabelTitle">
            {showColorPicker === true ? (
              <div className="colorPicker">
                <SketchPicker
                  triangle="hide"
                  color={fmainData.dataset[colorButton].color}
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
            {fmainData.dataset.length > 0 && (
              <div className="containedDataName">
                {dataCounter.map(function (line, index) {
                  return (
                    <div key={`yeah${index}`} className="newLine">
                      <button
                        style={
                          fmainData.dataset[index].color
                            ? {
                                backgroundColor: `${fmainData.dataset[index].color}`,
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
                value={fmainData.xTitle}
                id="standard-basic"
                label="X-Axis Label"
                variant="outlined"
                size="small"
                sx={{ width: "45%" }}
              />
              <TextField
                onChange={handleYLabel}
                size="small"
                name={"yAxisLabel"}
                value={fmainData.yTitle}
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
                {fmainData.dataset[showing].name
                  ? fmainData.dataset[showing].name
                  : `Dataset ${showing + 1} Title`}
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
                border: `1px solid ${fmainData.dataset[showing].color}`,
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
                          onChange={handlePointLabel}
                          placeholder={`Point ${index + 1} Label`}
                          value={fmainData.data[index].pointName}
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
                                  inputProps={{ type: "number" }}
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
                                  placeholder={`Point ${index + 1} Value`}
                                  value={
                                    fmainData.data[index][`line${lineIndex}`] &&
                                    fmainData.data[index][`line${lineIndex}`]
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
          height={600}
          className="chartMainContainer"
        >
          <AreaChart
            ref={chartRef}
            data={fmainData.data}
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
            <XAxis
              domain={"     "}
              interval={0}
              angle={options.rotateLabels === true ? -45 : 0}
              dataKey={
                fmainData.data[0] && fmainData.data[0].pointName !== ""
                  ? "pointName"
                  : "      "
              }
              label={
                options.showLabels === true && {
                  value: fmainData.xTitle,
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
              domain={[0, "auto"]}
              label={
                options.showLabels === true && {
                  value: fmainData.yTitle,
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
                <Area
                  key={`line${index}`}
                  strokeWidth={options.lineThickness}
                  type={options.lineType}
                  name={
                    fmainData.dataset[index].name
                      ? fmainData.dataset[index].name
                      : `Data ${index + 1}`
                  }
                  dataKey={`line${index}`}
                  fill={
                    fmainData.dataset[index].color
                      ? fmainData.dataset[index].color
                      : "#000000"
                  }
                  stroke={
                    fmainData.dataset[index].color
                      ? fmainData.dataset[index].color
                      : "#000000"
                  }
                  connectNulls={options.connectNull}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ChartTypeLine;
