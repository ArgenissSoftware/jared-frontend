import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useAuthStore } from '../stores/AuthStore';

export default function PrivateRoute({ children, ...rest }) {
  const authStore = useAuthStore();
  return (
    <Route
      {...rest}
      render={({ location }) =>
      authStore.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}