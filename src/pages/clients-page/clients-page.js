import React, { Component } from "react";
import { observer } from "mobx-react";
import "./clients-page.css";
import { Button, Input, List, Modal } from "semantic-ui-react";
import axios from "axios";
import ClientsStore from "../../stores/ClientsStore";
import AppStore from "../../stores/AppStore";
import TopNavBar from "../../components/TopNavBar/top-nav-bar";
import authStore from "../../stores/AuthStore";

let delClientName = "";
let delClientId = "";

const ClientsPage = observer(
  class ClientsPage extends Component {
    constructor(props) {
      super(props);
      ClientsStore.getClientsList();
      this.addClient = this.addClient.bind(this);
      this.removeClient = this.removeClient.bind(this);
      this.openConfirmationModal = this.openConfirmationModal.bind(this);
    }

    state = { modalOpen: false }
    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

    getRenderedClientsList(clientName, clientId) {
      return (
        <List.Item key={clientName}>
          <List.Icon name="user" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header as="a">{clientName}</List.Header>
            <List.Description as="a">Project Description</List.Description>
          </List.Content>
          <List.Icon className="times icon removeClientIcon" size="large" verticalAlign="middle"
            onClick={() => this.openConfirmationModal(clientName, clientId)} />
        </List.Item>
      );
    }

    async addClient() {
      if (ClientsStore.newClientsInput) {
        await axios
          .post(
            AppStore.URL + "/clients/",
            {
              name: ClientsStore.newClientsInput
            },
            {
              headers: {
                Authorization: "Bearer " + authStore.token,
                "Content-Type": "application/json"

              }
            }
          )
          .then(function (response) {
            ClientsStore.getClientsList();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      ClientsStore.newClientsInput = "";
    }

    openConfirmationModal(clientName, clientId) {
      delClientId = clientId;
      delClientName = clientName;
      this.setState({ modalOpen: true });
    }

    async removeClient() {
      await axios
        .delete(
          AppStore.URL + "/clients/" + delClientId,
          {
            headers: {
              Authorization: "Bearer " + authStore.token,
              "Content-Type": "application/json"
            }
          }
        )
        .then(function (response) {
          ClientsStore.getClientsList();
        })
        .catch(function (error) {
          console.log(error);
        });
        this.setState({ modalOpen: false });
    }

    handleMessage(e) {
      ClientsStore.newClientsInput = e.target.value;
    }

    render() {
      return (
        <div>
          <TopNavBar history={this.props.history} />
          <div className="ui container aligned">
            <Input
              onChange={this.handleMessage.bind(this)}
              action={<Button onClick={() => this.addClient()}>ADD</Button>}
              placeholder="Add a new client..."
              value={ClientsStore.newClientsInput}
            />
            <List divided relaxed>
              {ClientsStore.clients.map(client =>
                this.getRenderedClientsList(client.name, client._id)
              )}
            </List>
          </div>

          <Modal open={this.state.modalOpen} onClose={this.handleClose} >
            <Modal.Header>Confirmation needed</Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to remove {delClientName} from your clients list ?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.handleClose} negative>No</Button>
              <Button color='green' onClick={() => this.removeClient()} >Yes</Button>
            </Modal.Actions>
          </Modal>
        </div>
      );
    }
  }
);

export default ClientsPage;
