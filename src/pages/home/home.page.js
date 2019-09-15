import React from "react";
import "./home.page.css";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import HomepageRouter from "../../homepage.router";

/**
 * Home Page Component
 * @param {Object} props
 */
export default function(props) {
  return (
    <div>
      <TopNavBar history={props.history}/>
      <HomepageRouter {...props}/>
    </div>
  );
}

