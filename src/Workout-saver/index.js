import React, { Component } from "react";
import Saver from "./Saver";
import "./index.css";
import Playground from "./Workout-playground";

export default class index extends Component {
  render() {
    return (
      <div className="workout-saver-wrapper">
        <Saver />
        <Playground />
      </div>
    );
  }
}
