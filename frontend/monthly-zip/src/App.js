import React, { useState }  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import Login from './features/user/Login';
import Signup from './features/user/Signup';
import Navbar from './features/navbar/Navbar';
import TenantMain from './features/tenant/TenantMain';
import LandlordMain from './features/landlord/LandlordMain';

function App() {
  // const [userType, setUserType] = useState(null);
  const [userType, setUserType] = useState('임차인');

  return (
    <Router>
      <div className="app-container">
        <Navbar userType={ userType }/>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tenant-main" element={<TenantMain />} />
          <Route path="/landlord-main" element={<LandlordMain />} />

        </Routes>
      </div>
    </Router>
  );
}
export default App;