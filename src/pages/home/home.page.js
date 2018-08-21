import React, {Component} from "react";
import {observer} from "mobx-react";
import "./home.page.css";
import TopNavBar from "../../components/TopNavBar/top-nav-bar";
import SuccessMessage from '../../components/SuccessMessage/success-message'
import HomeMenuComponent from "../../components/HomeMenu/home-menu.component";
import HomepageRouter from "../../homepage.router";

let registerSuccessMessage;
let updateSuccessMessage;

const HomePage = observer(class HomePage extends Component {

  constructor(props) {
    super(props);
    registerSuccessMessage = typeof(props.location.state) !== "undefined"
      ? props.location.state.registerSuccessMessage
      : false;
    updateSuccessMessage = typeof(props.location.state) !== "undefined"
      ? props.location.state.updateSuccessMessage
      : false;
  }

  render() {
    return (
      <div>
        <TopNavBar history={this.props.history}/> {(registerSuccessMessage)
          ? <SuccessMessage
              title="Register"
              message="Your user registration was successful."></SuccessMessage>
          : null
}
        {(updateSuccessMessage)
          ? <SuccessMessage
              title="Update data"
              message="Your data was successfully updated"></SuccessMessage>
          : null
}
        <div className='rowC'>
          <HomeMenuComponent history={this.props.history}/>

          <HomepageRouter/>
        </div>
      </div>
    );
  }
});

export default HomePage;
