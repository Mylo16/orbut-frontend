import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './protectedRoute';
import Navbar from './home components/navBar';
import LoginPage from './session pages/loginPage';
import SignupPage from './session pages/signupPage';
import ChatPage from './home components/chatPage';
import CampaignPage from './home components/campaignPage';
import SupportPage from './home components/supportPage';
import LeadsPage from './home components/leadsPage';
import ArchivePage from './home components/archivesPage';
import DashBoard from './home components/dashBoardPage';

export default function RoutesComponent() {
  const { user } = useSelector((store) => store.user);

  return (
    <Routes>
      <Route element={<ProtectedRoute userAllowed={!user} redirectTo="/home" />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<ProtectedRoute userAllowed={!!user} redirectTo="/" />}>
        <Route path="/home" element={<Navbar />}>
          <Route index element={<DashBoard />} />
          <Route path="/home/campaigns" element={<CampaignPage />} />
          <Route path="/home/chat" element={<ChatPage />} />
          <Route path="/home/support" element={<SupportPage />} />
          <Route path="/home/leads" element={<LeadsPage />} />
          <Route path="/home/arvhives" element={<ArchivePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
