import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.render(<App />, rootElement);
}
registerServiceWorker();
