import React, { Component } from "react";
import { observer } from "mobx-react";
import logo from "../../images/logo1.png";
import profileStore from "../../stores/ProfileStore";
import "./top-nav-bar.css";

const TopNavBar = observer(
  class TopNavBar extends Component {

    nextPath(path) {
      this.props.history.push(path);
    }

    render() {
      return (
        <div>
          <div className="ui large menu">
            <div className="header item clickable" onClick={() => this.nextPath("home")}>
              <img src={logo} alt="" />
              Jared
            </div>
            <div className="right menu">
              <div className="item">Welcome {profileStore.username}</div>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default TopNavBar;
