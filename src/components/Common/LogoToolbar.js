import React, { PureComponent } from "react";
import { Menu } from "semantic-ui-react";
import config from '../../config';

/**
 * Logo Toolbar
 */
class LogoToolbar extends PureComponent {

  /**
   * render
   */
  render() {
    return (
      <Menu size="large">
        <Menu.Item name="/home" onClick={this.handleItemClick}>
          <img src={this.props.logo} alt=""/>
          <b>{config.appName}</b>
        </Menu.Item>
        {this.props.children}
      </Menu>
    );
  }
};

export default LogoToolbar;
