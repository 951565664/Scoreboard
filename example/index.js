import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


// start 状态树应用到全局 通过Provider
ReactDOM.render(<App />
    , document.getElementById('root')
);
registerServiceWorker();

