import React from "react";

import { useAuthStore } from "../../stores/AuthStore";

export const hasRoleShow = (WrappedComponent) => {
  return (props) => {
    const authStore = useAuthStore();
    const roles = props.auth;
    let allowed = true;
    if (roles) {
      allowed = authStore.hasRole(roles);
    }

    if (allowed) {
      return <WrappedComponent {...props} />
    }

    return null;
  }
}