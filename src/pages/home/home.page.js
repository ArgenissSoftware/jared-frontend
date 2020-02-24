import React from "react";
import {withRouter} from 'react-router-dom';
import "./home.page.css";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import HomepageRouter from "../../homepage.router";

/**
 * Home Page Component
 * @param {Object} props
 */
export default withRouter(function(props) {
  return (
    <div>
      <TopNavBar history={props.history}/>
      <HomepageRouter {...props} history={props.history}/>
    </div>
  );
})

