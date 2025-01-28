import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Registor from './Registor';
import './Allstyles/App.css';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registor" element={<Registor />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={ <ProtectedRoute><Dashboard/></ProtectedRoute>} />

      </Routes>
    </div>
    

  );
}

export default App;
