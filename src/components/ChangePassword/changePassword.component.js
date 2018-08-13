import React, {Component} from "react";
import {observer} from "mobx-react";
import {Button} from "semantic-ui-react";
import PasswordForm from "../../components/PasswordForm/password-form";

const ChangePasswordComponent = observer(class ChangePasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
    }

    save() {
        //call API
    }

    render() {
        return (
            <div>
                <div className="ui container center aligned">
                    <PasswordForm/>
                </div>
                <div className="ui container center aligned">
                    <Button onClick={this.save}>Save</Button>
                </div>
            </div>
        );
    }
});

export default ChangePasswordComponent;