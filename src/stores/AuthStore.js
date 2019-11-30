import React from 'react'
import { useLocalStore } from 'mobx-react-lite'
import authService from '../services/auth.service';
import getAvatar from '../utils/getAvatar';
import api from '../services/api.service';

function isString (value) {
  return typeof value === 'string'
}

const storeContext = React.createContext(null);

const token = localStorage.getItem('user_token');
api.setToken(token);
let user;
try {
  user = JSON.parse(localStorage.getItem('user')) || null;
} catch(e) {
  user = null;
}

const createStore = () => {
  return {
    username: "",
    token: token || "",
    user,
    async login(data) {
      const response = await authService.login(data)
      this.setUserAuth(response.data.data);
      return response.data;
    },
    setUserAuth(data) {
      this.token = data.token;
      localStorage.setItem('user_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      api.setToken(data.token);
      this.user = data.user;
    },
    getAvatar(data) {
      return getAvatar(this.user.email, data);
    },
    get isLoggedIn() {
      return this.token && this.user;
    },
    clearAuth() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('user_token');
      localStorage.removeItem('user');
    },
    hasRole(required) {
      if (!this.user) return false;

      if (isString(required)) {
        required = [[required]]
      } else if (Array.isArray(required) && required.every(isString)) {
        required = [required]
      }

      const roles = this.user.roles.map(r => r.name);

      return required.some(required => {
        return required.every(role => roles.indexOf(role) !== -1)
      });
    }
  };
}

export const AuthStoreProvider = ({ children }) => {
  const store = useLocalStore(createStore)
  api.setAuthStore(store);
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const useAuthStore = () => {
  const store = React.useContext(storeContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
}