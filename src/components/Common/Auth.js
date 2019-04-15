import React from "react";

import authStore from "../../stores/AuthStore";

export const hasRoleShow = (WrappedComponent) => {
  return class extends React.Component {

    render() {
      const roles = this.props.auth;
      let allowed = true;
      if (roles) {
        allowed = authStore.hasRole(roles);
      }

      if (allowed) {
        return <WrappedComponent {...this.props} />
      }

      return null;
    }
  }
}