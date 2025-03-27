import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './features/user/login/Login';
import Signup from './features/user/signup/Signup';
import TenantMgmt from './features/tenantMgmt/TenantMgmt';
import TenantMgmtDetail from './features/tenantMgmt/TenantMgmtDetail';
import AdminMyProfile from './features/myProfile/admin/AdminMyProfile';
import MyProfile from './features/myProfile/user/MyProfile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>홈 페이지</h1>} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/TenantMgmt" element={<TenantMgmt />} />
        <Route path="/TenantMgmtDetail" element={<TenantMgmtDetail />} />
        <Route path="/AdminMyProfile" element={<AdminMyProfile />} />
        <Route path="/MyProfile" element={<MyProfile />} />
       

      </Routes>
    </Router>
  );
}

export default App;
