import React, { Component } from "react";

export default class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minute: 0,
      second: 0,
      shortBreak: this.props.shortBreak,
      pomodoro: this.props.pomodoro,
      longBreak: this.props.longBreak,
      interval: undefined,
      stateName: "",
      pomodoroCount: 0
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleTimeChange(e, stateName) {
    for (const btn of document.querySelectorAll(".btn-outline-primary")) {
      btn.classList.remove("btn_active");
    }
    e.target.classList.add("btn_active");
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }

    this.countdown(this.state[stateName], stateName);
  }
  countdown(minute, stateName) {
    this.setState({
      minute,
      second: 0,
      stateName
    });
    this.startInterval();
  }

  startInterval() {
    const interval = setInterval(() => {
      if (!this.state.second) {
        this.setState({
          minute: this.state.minute - 1,
          second: 60
        });
      }
      this.setState({
        second: this.state.second - 1
      });
      if (this.state.minute === 0 && this.state.second === 0) {
        const name = this.state.stateName;
        this.setState({
          minute: this.props[name],
          second: 0,
          pomodoroCount:
            name === "pomodoro"
              ? this.state.pomodoroCount + 1
              : this.state.pomodoroCount
        });
      }
    }, 1000);

    this.setState({
      interval
    });
  }

  handleStart() {
    this.startInterval();
  }
  handleStop() {
    clearInterval(this.state.interval);
  }
  handleReset() {
    clearInterval(this.state.interval);
    this.setState({
      minute: 0,
      second: 0,
      shortBreak: this.props.shortBreak,
      pomodoro: this.props.pomodoro,
      longBreak: this.props.longBreak,
      interval: undefined
    });
    for (const btn of document.querySelectorAll(".btn-outline-primary")) {
      btn.classList.remove("btn_active");
    }
  }
  render() {
    const { minute, second } = this.state;
    return (
      <div className="container main_container">
        <div className="row">
          <div className="col-md-4">
            <button
              onClick={e => this.handleTimeChange(e, "shortBreak")}
              className="btn btn-outline-primary"
            >
              Short Break
            </button>
          </div>
          <div className="col-md-4">
            <button
              onClick={e => this.handleTimeChange(e, "pomodoro")}
              className="btn btn-outline-primary"
            >
              Pomodoro
            </button>
          </div>
          <div className="col-md-4">
            <button
              onClick={e => this.handleTimeChange(e, "longBreak")}
              className="btn btn-outline-primary"
            >
              Long Break
            </button>
          </div>
        </div>
        <div className="row">
          <div className="text-center col-md-4 offset-md-4">
            <h1 id="time-count">{`${minute ? minute : "00"} : ${
              second ? second : "00"
            }`}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <br />
            <br />
            <br />
            <div className="row">
              <div className="col-md-4">
                <button
                  onClick={this.handleStop}
                  className="btn btn-outline-danger"
                >
                  Stop
                </button>
              </div>
              <div className="col-md-4">
                <button
                  onClick={this.handleStart}
                  className="btn btn-outline-success"
                >
                  Start
                </button>
              </div>
              <div className="col-md-4">
                <button
                  onClick={this.handleReset}
                  className="btn btn-outline-default"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <h2>
          Pomodoro Count:
          <span
            style={{
              borderRadius: "100%",
              margin: "15px",
              color: "white"
            }}
            className="badge badge-warning"
          >
            {this.state.pomodoroCount}
          </span>
        </h2>
      </div>
    );
  }
}
