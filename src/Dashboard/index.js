import React, { Component } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import WorkoutSaver from "../Workout-saver";
import "./index.css";

export default class index extends Component {
  render() {
    return (
      <div className="builder-wrapper">
        <Sidebar />
        <div className="builder-container">
          <Navbar />
          <WorkoutSaver />
        </div>
      </div>
    );
  }
}
