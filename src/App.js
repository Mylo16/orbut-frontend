import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromLocalStorage } from './redux/userSlice'
import ProtectedRoute from './components/protectedRoute';
import LoginPage from './components/session pages/loginPage';
import SignupPage from './components/session pages/signupPage';
import Navbar from './components/home components/navBar';
import DashBoard from './components/home components/dashBoardPage';
import CampaignPage from './components/home components/campaignPage';
import ChatPage from './components/home components/chatPage';
import SupportPage from './components/home components/supportPage';
import LeadsPage from './components/home components/leadsPage';
import ArchivePage from './components/home components/archivesPage';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  },[])
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute userAllowed={!user} redirectTo="/home" />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute userAllowed={!!user} redirectTo="/" />}>
          <Route path='/home' element={<Navbar />}>
            <Route index element={<DashBoard />} />
            <Route path="/home/campaigns" element={<CampaignPage />} />
            <Route path="/home/chat" element={<ChatPage />} />
            <Route path="/home/support" element={<SupportPage />} />
            <Route path="/home/leads" element={<LeadsPage />} />
            <Route path="/home/archives" element={<ArchivePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
