import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
 
import Login from './component/Login/Login';
 
import Admin from './component/Admin/Admin';
 
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={<Admin />}
        />
         
         
      </Routes>
    </Router>
     
  );
}

export default App;
