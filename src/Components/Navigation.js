// Navigation.js

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { selectedType } from "../slices/chartMainSlice";
import Button from "@mui/material/Button";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import Slider from "@mui/material/Slider";
import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import Swal from "sweetalert2";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import TextField from "@mui/material/TextField";
import { height } from "@mui/system";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  cLineThickness,
  cLineType,
  cShowGrid,
  cShowLabels,
  cRotateLabels,
  cShowLegend,
  cConnectNull,
  cTickNumber,
  RESET_STATE_OPTIONS,
} from "../slices/chartOptionsSlice";
import { RESET_STATE_MAIN } from "../slices/chartMainSlice";
import { useNavigate } from "react-router-dom";

const Navigation = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chart = useSelector(function (state) {
    return state.chart;
  });
  const options = useSelector(function (state) {
    return state.options;
  });
  // const [reduxOptions, setReduxOptions] = useState(options)
  const [chartImage, setChartImage] = useState("");
  const [downloadAlert, setDownloadAlert] = useState(false);
  const [infoTickEl, setInfoTickEl] = useState(null);
  const [infoNullEl, setInfoNullEl] = useState(null);
  const [infoRotateEl, setInfoRotateEl] = useState(null);
  const [chartSettingsShow, setChartSettingsShow] = useState(false);
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
  // const chartOptions = useSelector(function (state) {
  //   return state.options;
  // });
  // console.log(chartOptions)

  const handleGoBack = function () {
    Swal.fire({
      text: "Would you like to save your chart options?",
      confirmButtonText: "Yes",
      confirmButtonColor: "green",
      denyButtonText: "No",
      showConfirmButton: true,
      showDenyButton: true,
      showCancelButton: true,
    }).then(function (result) {
      if (result.isConfirmed) {
        dispatch(RESET_STATE_OPTIONS());
        dispatch(selectedType("default"));
        navigate("/");
      } else if (result.isDenied) {
        dispatch(selectedType("default"));
        navigate("/");
      }
    });
    // dispatch(RESET_STATE_OPTIONS());
  };
  const handleLineThickness = function (e) {
    dispatch(cLineThickness(e.target.value));
  };

  const handleShowGrid = function (e) {
    dispatch(cShowGrid(e.target.checked));
  };
  const handleShowLabels = function (e) {
    dispatch(cShowLabels(e.target.checked));
  };
  const handleRotateLabels = function (e) {
    dispatch(cRotateLabels(e.target.checked));
  };
  const handleShowLegend = function (e) {
    dispatch(cShowLegend(e.target.checked));
  };
  const handleLineType = function (e) {
    dispatch(cLineType(e.target.value));
  };
  const handleNullValues = function (e) {
    dispatch(cConnectNull(e.target.value));
  };
  const handleTickChange = function (e) {
    dispatch(cTickNumber(e.target.value));
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
  const handleInfoNullOpen = function (e) {
    setInfoNullEl(e.currentTarget);
  };
  const handleInfoNullClose = function (e) {
    setInfoNullEl(null);
  };
  const inputOptions = {
    white: "White",
    transparent: "Transparent",
  };
  const handleSaveChart = function (e) {
    if (options.chartRef === null) {
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
            toPng(options.chartRef.container, {
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
  const handleChartOptionShow = function (e) {
    setChartSettingsShow(!chartSettingsShow);
  };
  return (
    <nav className="navMain">
      <div className="navInner">
        {/* <Link to={"/"}> */}
        <Button
          className="navBack"
          color="warning"
          sx={{ padding: "0" }}
          variant="outlined"
          onClick={handleGoBack}
        >
          back
        </Button>
        {/* </Link> */}
        <p className="navChartType">
          Chart type: <span>{chart.value}</span>
        </p>

        <Button
          onClick={handleChartOptionShow}
          sx={{ padding: "0 10px" }}
          variant="outlined"
          endIcon={
            <SettingsIcon
              sx={{
                transition: "all 0.3s linear",
                transform:
                  chartSettingsShow === true ? "rotate(360deg)" : "rotate(0)",
              }}
            />
          }
          startIcon={
            <ArrowDropDownIcon
              sx={{
                transition: "all 0.3s linear",
                transform:
                  chartSettingsShow === true ? "rotate(180deg)" : "rotate(0)",
              }}
            />
          }
          // disabled={dataCounter.length !== 0 ? false : true}
        >
          Chart Options
        </Button>
        <div className="chartOptionsMain">
          {/* {dataCounter.length !== 0 && fmainData.dataPoints.length > 0 ? ( */}
          <div
            className={
              chartSettingsShow === true
                ? "chartSettings chartSettingsShow"
                : "chartSettings chartSettingsHide"
            }
          >
            <div className="gridOption">
              <p>Show grid</p>
              <Switch
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                checked={options.showGrid}
                onChange={handleShowGrid}
              />
            </div>
            <div className="labelsOption">
              <p>Show labels</p>
              <Switch
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                onChange={handleShowLabels}
                checked={options.showLabels}
              />
            </div>
            <div className="rotateOption">
              <div className="textIcon">
                <p>Rotate labels</p>
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
                      causes each space separated word to go in the next line.
                      If the labels are written before this option is selected,
                      you must interact with the label input for the word line
                      break to take effect (Like adding an empty space in the
                      desired input).
                    </Typography>
                  </Popover>
                </div>
              </div>
              <Switch
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                onChange={handleRotateLabels}
                checked={options.rotateLabels}
              />
            </div>
            <div className="legendOption">
              <p>Show legend</p>
              <Switch
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                onChange={handleShowLegend}
                checked={options.showLegend}
              />
            </div>
            <div className="lineNullOption">
              <div className="textIcon">
                <p>Connect nulls</p>
                <div className="infoPopIconAbsolute">
                  <PriorityHighIcon
                    color="warning"
                    aria-describedby={idInfoPop}
                    fontSize={"small"}
                    onClick={handleInfoNullOpen}
                  />
                  <Popover
                    id={idInfoPop}
                    open={openInfoNull}
                    anchorEl={infoNullEl}
                    onClose={handleInfoNullClose}
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
                      Connects points even if certain data points are missing.
                      Example: If your 3rd and 4th X-Axis points have no data,
                      but your 2nd and 5th do, it will connect the 2nd and 5th
                      points.
                    </Typography>
                  </Popover>
                </div>
              </div>
              <Switch
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                onChange={handleNullValues}
                checked={options.connectNull}
              />
            </div>
            <div className="lineOption">
              <p>Line thickness</p>
              <Box sx={{ width: 50 }}>
                <Slider
                  aria-label="Line thickness"
                  value={options.lineThickness}
                  step={1}
                  marks
                  min={1}
                  max={3}
                  onChange={handleLineThickness}
                  size="small"
                />
              </Box>
            </div>
            <div className="lineTicks">
              <div className="textIcon">
                <p>Tick count</p>
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
                      Sets the number of intervals on the Y-Axis. Current
                      maximum value is 20.
                    </Typography>
                  </Popover>
                </div>
              </div>
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
                defaultValue="monotone"
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
                  value="monotone"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 22,
                        },
                      }}
                    />
                  }
                  label="Mono"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="step"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 22,
                        },
                      }}
                    />
                  }
                  label="Step"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="linear"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 22,
                        },
                      }}
                    />
                  }
                  label="Linear"
                  labelPlacement="start"
                />
              </RadioGroup>
            </div>
            {/* <div className="saveChart"> */}
            {/* <Button
                sx={{
                  padding: "2px 10px",
                  fontSize: "13px",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
                variant="outlined"
                onClick={handleMoreSettings}
                disabled
              >
                Settings +
              </Button> */}
            {/* </div> */}
            <Button
              sx={{
                padding: "2px 10px",
                fontSize: "13px",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              }}
              variant="outlined"
              onClick={() => {
                setChartSettingsShow(false);
              }}
            >
              Exit Options
            </Button>
          </div>
          {/* ) : null} */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
