import React, { Component } from "react";
import "./index.css";
import { RiComputerLine } from "react-icons/ri";
import { VscBell } from "react-icons/vsc";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default class index extends Component {
  render() {
    return (
      <div className="builder-navbar">
        <div className="navbar-brand"></div>
        <div className="right-navbar">
          <div className="nav-icons">
            <div className="nav-demo">
              <RiComputerLine className="icon-color" />
            </div>

            <div className="nav-notification">
              <VscBell className="icon-color" />
            </div>
            <div className="nav-logout">
              <RiLogoutBoxRLine className="icon-color" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
