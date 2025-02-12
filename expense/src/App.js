import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Registor from './Registor';
import './Allstyles/App.css';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import Members from './Members';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registor" element={<Registor />} />
        <Route path="/Dashboard" element={ <Dashboard/>} />
        <Route path="/Members" element={ <Members/>}></Route>

      </Routes>
    </div>
    

  );
}

export default App;
