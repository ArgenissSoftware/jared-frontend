import React, { Component } from "react";
import { Button, Message, Header, Form } from "semantic-ui-react";
import { observer } from "mobx-react";

import UserProfileTabs from "../../components/UserTabs/user-profile-tabs";
import userStore from "../../stores/UserStore";
import ErrorMessage from "../ErrorMessage/error-message";

export default observer(
  class UserProfileComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { newClient: false,
                     title: "",
                     errorText: ""                    
                    };
    }

    componentDidMount(){
      this.isNew()
    }

    save = async () => {
      this.setState({ errorText: "" });
      if(this.state.newClient){
        userStore.add(userStore.user)
        .then(() =>{
          this.props.history.push("/home/users");
        })
        .catch((error) => {
          this.setState({ errorText: error.response.request.responseText });
        });
      }else{
      userStore.updateUser()
      .then(() => {
        this.props.history.push("/home/users");
      })
      .catch((error) => {
        this.setState({ errorText: error.response.request.responseText });
      });
      }
    }

    delete = async() => {
      userStore.disable()
      .then(() => {
        this.props.history.push("/home/users");
      })
      .catch((error) => {
        console.log("Fail to delete. Error: " + error);
      });
    }

    isNew(){
      let url = (window.location.href).split("/");
      if(url[url.length -1] == 'new'){ 
        this.setState({ newClient: true });
        this.setState({ title: "Create User"});
        }else{
          this.setState({ title: "Update User"});        
      }
    }

    render() {
      return (
        <div className="ui container center aligned">
          {(userStore.error) ? <Message negative
            header="Error"
            content={userStore.error}
          /> : null}
          <Header as="h3" icon="user" content={this.state.title} />
          <UserProfileTabs history={this.props.history}/>
          <Form>
            <Button positive onClick={this.save}>Save</Button>
            { !this.state.newClient ? (
              <Button negative onClick={this.delete}>Delete</Button>
              ) : null
            }
          </Form>
          { this.state.errorText ? (
            <ErrorMessage message = { this.state.errorText }/>
            ) : null
          }
        </div>
      );
    }
  }
);