import authStore from "./stores/AuthStore";
import React, { Component } from 'react';

const RolesAuth = (allowedRoles) => (WrappedComponent) => {
  if (isClassComponent(WrappedComponent)) {
    return AuthClassComponent(allowedRoles)(WrappedComponent)
  }
  if (isReactElement(WrappedComponent)) {
    return AuthReactElement(allowedRoles)(WrappedComponent)
  }
}

const AuthClassComponent = (allowedRoles) => (WrappedComponent) => {
  return class AuthClassHOC extends Component {
    render() {
      WrappedComponent = matchRoles(allowedRoles, WrappedComponent)
      return (<WrappedComponent { ...this.props } />)
    }
  }
}

const AuthReactElement = (allowedRoles) => (WrappedComponent) => {
  return (matchRoles(allowedRoles, WrappedComponent))
}

const matchRoles = (allowedRoles, WrappedComponent) => {
  if (authStore.user.roles) {
    const permission = authStore.user.roles.find(userRole =>
      allowedRoles.includes(userRole.name)
    )
    if (permission) {
      return WrappedComponent
    }
  }
}

function isClassComponent(component) {
  return (typeof component === 'function' && !!component.prototype.isReactComponent) ? true : false
}

function isReactElement(element) {
  return React.isValidElement(element);
}

const AdminAuth     = RolesAuth(['Admin']);
const DeveloperAuth = RolesAuth(['Developer']);

export { AdminAuth, DeveloperAuth }