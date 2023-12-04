import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import r2wc from '@r2wc/react-to-web-component';
import { WcComponent } from './wcComponent';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//const root = ReactDOM.createRoot(document.getElementById('root'));
const wcComponent = r2wc(WcComponent);


/*root.render(
 
);*/
customElements.define("r2w-component", wcComponent);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
