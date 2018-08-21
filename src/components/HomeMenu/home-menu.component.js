import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'

export default class HomeMenuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: {}
        }
    }

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name});
        this.props.history.push("../home/" + name);
    }

    render() {
        const {activeItem} = this.state || {}

        return (
            <Menu vertical>
                <Menu.Item>
                    <Menu.Header>Admin</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                            name='users'
                            active={activeItem === 'users'}
                            onClick={this.handleItemClick}>
                            User List
                            </Menu.Item>
                        <Menu.Item
                            name='clients'
                            active={activeItem === 'clients'}
                            onClick={this.handleItemClick}/>
                    </Menu.Menu>
                </Menu.Item>
   
            </Menu>
        )
    }
}