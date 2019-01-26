import React, { PureComponent } from "react";
import {
  Dropdown,
} from "semantic-ui-react";

/**
 * Page Size Selector
 */
class PageSizeSelector extends PureComponent {

  /**
   * render
   */
  render() {
    return (
      <div>
      Show me <Dropdown
          type="dropdown"
          inline
          options={this.props.pageSizeOptions}
          defaultValue={this.props.pageSize}
          onChange={this.props.onChange}
        /> items per page
      </div>
    );
  }
};

export default PageSizeSelector;
