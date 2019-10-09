import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { useLoginContext } from 'context';
import { setBasepath } from 'hookrouter'

console.log(process.env.REACT_APP_BASE_URL_APP);
setBasepath(process.env.REACT_APP_BASE_URL_APP);

ReactDOM.render(
    <useLoginContext.Provider>
        <App />
    </useLoginContext.Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
