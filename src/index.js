import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import store from "./stores/AppStore"

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
