import React, { Component } from "react";
import { observer } from "mobx-react";
import "./home-page.css";

const HomePage = observer(
  class HomePage extends Component {
    render() {
      return (
        <div>
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
                <div className="ui bottom attached button">
                  <i className="add icon" />
                  Go to lunch docs
                </div>
              </div>
              <div className="card">
                <div className="content">
                  <div className="header">My Profile</div>
                  <div className="description">
                    Edit your profile.
                  </div>
                </div>
                <div className="ui bottom attached button">
                  <i className="add icon" />
                  Go to my profile
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
