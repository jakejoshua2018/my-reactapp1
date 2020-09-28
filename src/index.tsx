import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './containers/App';


//Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render( 
    <BrowserRouter><App /></BrowserRouter>, 
    document.getElementById('root') 
);
