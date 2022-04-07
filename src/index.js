import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/reset.css';
import './styles/style.scss';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename="/carsharing-admin">
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
