// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import reportWebVitals from './reportWebVitals';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App/>
//   </React.StrictMode>
// );

// reportWebVitals();
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18+
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
root.render(
   <React.StrictMode>
    <Router>
      <App />
    </Router> 
     </React.StrictMode> 
);

