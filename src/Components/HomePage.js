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
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SettingsIcon from "@mui/icons-material/Settings";

const HomePage = function (props) {
  const [selectedChart, setSelectedChart] = useState("default");
  const [infoWelcomeEl, setInfoWelcomeEl] = useState(null);
  const [animation, setAnimation] = useState(false);
  const dispatch = useDispatch();
  // const chart = useSelector(function (state) {
  //   return state.chart;
  // });
  const openInfoWelcome = Boolean(infoWelcomeEl);
  const idInfoPop = openInfoWelcome ? "info-popup-tick" : undefined;
  // console.log(chart)
  const handleChartType = function (event) {
    setSelectedChart(event.target.value);
    dispatch(selectedType(event.target.value));
    props.type(event.target.value);
    setAnimation(true);
  };
  const handleInfoWelcomeOpen = function (e) {
    setInfoWelcomeEl(e.currentTarget);
  };
  const handleInfoWelcomeClose = function (e) {
    setInfoWelcomeEl(null);
  };
  return (
    <div className="wrapper mainContainer">
      <video autoPlay muted loop id="welcomeVideo">
        <source
          src={"./assets/background/welcomeBackground.mp4"}
          type="video/mp4"
        />
      </video>
      <svg className="svgTitle" viewBox="0 0 2220 200">
        <text x="50%" y="50%" dy=".35em" textAnchor="middle">
          The Chart Emporium
        </text>
      </svg>
      <div className="typeSettingsFlex">
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
          <div className="progressText">
            <PriorityHighIcon
              color="warning"
              aria-describedby={idInfoPop}
              fontSize={"large"}
              onClick={handleInfoWelcomeOpen}
            />
            <Popover
              id={idInfoPop}
              open={openInfoWelcome}
              anchorEl={infoWelcomeEl}
              onClose={handleInfoWelcomeClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography
                sx={{
                  backgroundColor: "#ffffffab",
                  padding: "15px 20px 15px 20px",
                  fontSize: "15px",
                  width: "500px",
                }}
              >
                Hey! Thanks for visiting :). With the chart settings starting to
                take up more and more room, and the introduction of a navigation
                bar, I've started to store state in Redux so that I can remove
                the "settings" element from the chart components. <br />
                <br /> The site is not optimized for smaller screen sizes (1000
                viewport width or less). If you run into any issues, or have
                suggestions about the site, connect with me over{" "}
                <a
                  href="https://www.linkedin.com/in/koki-vasileski/"
                  target={"_blank"}
                >
                  LinkedIn
                </a>{" "}
                or{" "}
                <a href="https://github.com/Koki001" target={"_blank"}>
                  GitHub
                </a>{" "}
                and let me know!
              </Typography>
            </Popover>
          </div>
        </div>
        <Button disabled className="gearButton">
          <SettingsIcon className="gearIcon" fontSize="large" />
        </Button>
      </div>
      {selectedChart !== "default" && (
        <div className="chartExample">
          <div
            onAnimationEnd={() => setAnimation(false)}
            className={`chartExampleText ${animation}TextAnimation`}
          >
            {selectedChart === "line" ? (
              <div className="lineExample">
                <div className="lineText">
                  <h3>Suggested use:</h3>
                  <p>
                    When wanting to showcase a continuous dataset, or multiple
                    datasets over the same period of time. It's a simple and
                    effective way to compare different groups of data over short
                    and long periods of time, especially when the changes in
                    data over time are smaller.{" "}
                  </p>
                </div>
                <div className="buttonLink">
                  <Link to={`/create/${selectedChart}`}>
                    <Button variant="outlined">Use this type</Button>
                  </Link>
                </div>
              </div>
            ) : selectedChart === "area" ? (
              <div className="lineExample">
                <div className="lineText">
                  <h3>Usage example:</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quas in nobis saepe nemo molestiae laborum minima! Ad,
                    autem. Odio quidem officiis cupiditate adipisci expedita
                    quas, eius impedit eveniet dolorem ipsa.{" "}
                  </p>
                </div>
                <div className="buttonLink">
                  <Link to={`/create/${selectedChart}`}>
                    <Button variant="outlined">Use this type</Button>
                  </Link>
                </div>
              </div>
            ) : selectedChart === "bar" ? (
              <div className="lineExample">
                <div className="lineText">
                  <h3>Usage example:</h3>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Commodi natus unde tempore, magni at deserunt obcaecati
                    perspiciatis fugit numquam amet accusantium non quaerat
                    voluptatum, consequuntur ea quasi laborum a facilis.{" "}
                  </p>
                </div>
                <div className="buttonLink">
                  <Link to={`/create/${selectedChart}`}>
                    <Button variant="outlined">Use this type</Button>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
          <div
            onAnimationEnd={() => setAnimation(false)}
            className={`chartExampleImage ${animation}ImageAnimation`}
          >
            <img
              src={`./assets/chartSelectTypes/${selectedChart}.png`}
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
