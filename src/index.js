import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";
import React from "react";
import ReactDOM from "react-dom";
import Pomodorofrom from "./pomodoro";

ReactDOM.render(
  <Pomodorofrom shortBreak={1} pomodoro={2} longBreak={3} />,
  document.getElementById("root")
);
