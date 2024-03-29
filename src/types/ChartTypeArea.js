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
import { current } from "@reduxjs/toolkit";

const ChartTypeArea = function () {
  const options = useSelector(function (state) {
    return state.options;
  });
  const chart = useSelector(function (state) {
    return state.chart;
  });
  const [fmainData, setFmainData] = useState({
    dataPoints: [],
    xTitle: "",
    yTitle: "",
    data: [],
    dataset: [],
  });
  const [tickMax, setTickMax] = useState("");
  const [dataCounter, setDataCounter] = useState([]);
  const [dataNumDropdown, setDataNumDropdown] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorButton, setColorButton] = useState([]);
  const chartRef = useRef();
  const [showing, setShowing] = useState(0);
  const [rangeShow, setRangeShow] = useState(false);
  const [iconClicks, setIconClicks] = useState(0);

  // switiching for ranged type
  useEffect(
    function () {
      setRangeShow(options.range);
    },
    [options.range]
  );

  // clearing value when switching between range/normal modes
  useEffect(
    function () {
      if (rangeShow === false) {
        const chartCopy = [...fmainData.data];
        for (let obj = 0; obj < fmainData.data.length; obj++) {
          for (let lin = 0; lin < fmainData.dataset.length; lin++) {
            chartCopy[obj][`line${lin}`][1] = "";
          }
        }
        setFmainData(function (current) {
          return { ...current, data: [...chartCopy] };
        });
      }
    },
    [rangeShow]
  );

  // populates data point dropdown
  useEffect(function () {
    let pointNumArray = [];
    for (let i = 0; i < 20; i++) {
      pointNumArray.push(i + 1);
    }
    setDataNumDropdown(pointNumArray);
  }, []);

  // creates a set of *new* fields for number of data points for each dataset
  const handleDataPointNum = function (e) {
    const pointArray = [];
    const dataArray = [...fmainData.data];

    for (let i = 0; i < Number(e.target.value); i++) {
      pointArray.push(i);

      if (!dataArray.includes(dataArray[i])) {
        dataArray.push({ pointName: "" });
      }

      for (let l = 0; l < fmainData.dataset.length; l++) {
        if (!Object.keys(dataArray[i]).includes(`line${l}`)) {
          dataArray[i][`line${l}`] = ["", ""];
        }
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

  // main label for x-axis
  const handleXLabel = function (e) {
    setFmainData(function (current) {
      return { ...current, xTitle: e.target.value };
    });
  };

  // main label for y-axis
  const handleYLabel = function (e) {
    setFmainData(function (current) {
      return { ...current, yTitle: e.target.value };
    });
  };

  // data point labels / along x-axis
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

  // data point values / along y-axis
  const handleDataChange = function (e) {
    const chartCopy = [...fmainData.data];
    chartCopy[e.target.parentElement.parentElement.parentElement.id][
      `line${e.target.id}`
    ][0] = Number(e.target.value);
    setFmainData(function (current) {
      return { ...current, data: [...chartCopy] };
    });
  };

  // data point values for area range type
  const handleDataChangeRange = function (e) {
    const chartRangeCopy = [...fmainData.data];
    if (e.target.placeholder.includes("Min")) {
      chartRangeCopy[e.target.parentElement.parentElement.parentElement.id][
        `line${e.target.id}`
      ][0] = Number(e.target.value);
    } else if (e.target.placeholder.includes("Max")) {
      chartRangeCopy[e.target.parentElement.parentElement.parentElement.id][
        `line${e.target.id}`
      ][1] = Number(e.target.value);
    }
    setFmainData(function (current) {
      return { ...current, data: [...chartRangeCopy] };
    });
  };

  // title for each dataset
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

  // adding a new dataset with selected data point number
  const handleNewDataset = function (e) {
    const nameArray = [...fmainData.dataset];
    nameArray.push({ name: "", color: "", id: "" });
    let dataArray = [...fmainData.data];
    let counter = [];
    for (let i = 0; i < dataCounter.length + 1; i++) {
      counter.push(i);
      nameArray[i] = { ...nameArray[i], id: `line${i}id` };
    }
    for (let d = 0; d < dataArray.length; d++) {
      dataArray[d] = {
        ...dataArray[d],
        [`line${dataCounter.length}`]: ["", ""],
      };
    }
    setDataCounter([...counter]);
    setFmainData(function (current) {
      return { ...current, data: [...dataArray], dataset: [...nameArray] };
    });
  };

  // ***** not implemented *****
  const handleRemoveLine = function (e) {};

  // cycles through datasets -- next
  const handleNextClick = function () {
    if (showing < fmainData.dataset.length - 1) {
      setShowing(showing + 1);
    } else if (showing === fmainData.dataset.length - 1) {
      setShowing(0);
    }
  };

  // cycles through datasets -- prev
  const handlePrevClick = function () {
    if (showing <= fmainData.dataset.length && showing > 0) {
      setShowing(showing - 1);
    } else if (showing === 0 || showing < 0) {
      setShowing(fmainData.dataset.length - 1);
    }
  };

  // ***** color picker needs revisit *****
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

  // ***** download chart options needs revisit *****
  // converts recharts to png
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
  const handleTickAbsolute = function (e) {
    setTickMax(e.target.value);
  };
  const handleLegendClick = function (e) {
    const typeArray = [...fmainData.dataset];

    let iconArray = ["line", "diamond", "star", "wye", "circle"];
    for (let i = 0; i < fmainData.dataset.length; i++) {
      if (e.id === fmainData.dataset[i].id) {
        console.log(iconClicks);
        if (iconClicks === 4) {
          setIconClicks(0);
        } else {
          setIconClicks(iconClicks + 1);
        }
        typeArray[i].type = iconArray[iconClicks];
      }
    }
    setFmainData(function (current) {
      return { ...current, dataset: [...typeArray] };
    });
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
            {showColorPicker === true && (
              <div
                onClick={() => {
                  setShowColorPicker(false);
                }}
                className="colorPickerExit"
              ></div>
            )}
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
              <h4
                className={
                  fmainData.dataset[showing].name === ""
                    ? "noName"
                    : "nameFilled"
                }
              >
                {fmainData.dataset[showing].name
                  ? fmainData.dataset[showing].name
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
                            if (rangeShow === false) {
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
                                      fmainData.data[index][
                                        `line${lineIndex}`
                                      ] &&
                                      fmainData.data[index][
                                        `line${lineIndex}`
                                      ][0]
                                    }
                                    variant="standard"
                                  />
                                </div>
                              );
                            } else if (rangeShow === true) {
                              return (
                                <div
                                  className="dataPointInputs"
                                  key={`data${index}`}
                                  id={index}
                                >
                                  <TextField
                                    type={"number"}
                                    inputProps={{
                                      type: "number",
                                    }}
                                    onWheel={(e) => e.target.blur()}
                                    sx={{
                                      "& .MuiInputBase-input": {
                                        padding: "2px 12px",
                                        minWidth: "30px",
                                        textAlign: "center",
                                      },
                                    }}
                                    id={`${lineIndex.toString()}`}
                                    onChange={handleDataChangeRange}
                                    placeholder={`Range ${index + 1} Min`}
                                    value={
                                      fmainData.data[index][
                                        `line${lineIndex}`
                                      ] &&
                                      fmainData.data[index][
                                        `line${lineIndex}`
                                      ][0]
                                    }
                                    variant="standard"
                                  />
                                  <TextField
                                    type={"number"}
                                    inputProps={{
                                      type: "number",
                                    }}
                                    onWheel={(e) => e.target.blur()}
                                    sx={{
                                      "& .MuiInputBase-input": {
                                        padding: "2px 12px",
                                        minWidth: "30px",
                                        textAlign: "center",
                                      },
                                    }}
                                    id={`${lineIndex.toString()}`}
                                    onChange={handleDataChangeRange}
                                    placeholder={`Range ${index + 1} Max`}
                                    value={
                                      fmainData.data[index][
                                        `line${lineIndex}`
                                      ] &&
                                      fmainData.data[index][
                                        `line${lineIndex}`
                                      ][1]
                                    }
                                    variant="standard"
                                  />
                                </div>
                              );
                            }
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
        <div
          className="absoluteTickChange"
          style={{
            transform:
              options.showLegend === false ? "rotate(-90deg)" : "rotate(0)",
            left: options.showLegend === false ? "-5px" : "5px",
            top: options.showLegend === false ? "15px" : "5px",
          }}
        >
          <TextField
            onChange={handleTickAbsolute}
            name={"tickTooltip"}
            value={tickMax}
            // id="standard-basic"
            placeholder={"Max"}
            variant="outlined"
            sx={{ width: "45%" }}
            size="small"
          />
        </div>
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
            {options.showXAxis === true && (
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
            )}
            {options.showYAxis === true && (
              <YAxis
                // domain={[0, `dataMax`]}
                domain={[0, tickMax === "" ? "auto" : Number(tickMax)]}
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
            )}
            <Tooltip />
            {options.showLegend === true && (
              <Legend
                onClick={handleLegendClick}
                verticalAlign="top"
                align="center"
                height={36}
                iconSize="14"
                iconType={""}
                payload={fmainData.dataset?.map(function (each, index) {
                  return {
                    id: each.id,
                    value: each.name ? each.name : `set ${index}`,
                    color: each.color !== "" ? each.color : "black",
                    type: each.type,
                  };
                })}
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
                  // connectNulls={options.connectNull}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ChartTypeArea;
