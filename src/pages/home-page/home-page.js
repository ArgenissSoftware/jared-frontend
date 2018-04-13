import React, { Component } from "react";
import { observer } from "mobx-react";
import "./home-page.css";
import TopNavBar from "../../components/TopNavBar/top-nav-bar";

const HomePage = observer(
  class HomePage extends Component {
    nextPath(path) {
      this.props.history.push(path);
    }

    goToLunch() {
      window.open(
        "https://docs.google.com/spreadsheets/d/1cz8sAt2OEYAh1fuaW8Nx-F9pNQVkH6q7k6j-VKzeuY4/edit#gid=2004327840"
      );
    }

    render() {
      return (
        <div>
          <TopNavBar history={this.props.history} />
          <div className="ui container center aligned">
            <div className="ui four cards ">
              <div className="card">
                <div className="content">
                  <div className="header">Schedule</div>
                  <div className="description">
                    Register your worked time and keep track of the time
                    invested in every project.
                  </div>
                </div>
                <div className="ui bottom attached button">
                  <i className="add icon" />
                  Add worked time
                </div>
              </div>
              <div className="card">
                <div className="content">
                  <div className="header">Reports</div>
                  <div className="description">
                    Control your worked time,filter it by project or date.
                  </div>
                </div>
                <div className="ui bottom attached button">
                  <i className="add icon" />
                  Check My Reports
                </div>
              </div>
              <div className="card">
                <div className="content">
                  <div className="header">Lunch</div>
                  <div className="description">
                    Go to google drive and choose your weekly lunch.
                  </div>
                </div>
                <div
                  className="ui bottom attached button"
                  onClick={() => this.goToLunch()}
                >
                  <i className="add icon" />
                  Go to lunch docs
                </div>
              </div>
              <div className="card">
                <div className="content">
                  <div className="header">My Profile</div>
                  <div className="description">Edit your profile.</div>
                </div>
                <div
                  className="ui bottom attached button"
                  onClick={() => this.nextPath("profile")}
                >
                  <i className="add icon" />
                  Go to my profile
                </div>
              </div>
            </div>
            <div className="ui four cards ">
              <div className="card">
                <div className="content">
                  <div className="header">Clients</div>
                  <div className="description">Add new clients</div>
                </div>
                <div
                  className="ui bottom attached button"
                  onClick={() => this.nextPath("clients")}
                >
                  <i className="add icon" />
                  Go to clients list
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default HomePage;
