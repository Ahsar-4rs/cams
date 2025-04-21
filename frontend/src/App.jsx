import Header from './Components/Header/Header.jsx'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Home/Homepage.jsx';
import Footer from './Components/Footer/Footer.jsx';
import PrivacyPolicyPage from './pages/Privacy-policy/PrivacyPolicy.jsx';
import About from './Components/About/About.jsx';
import EventPage from './pages/Events-Page/EventsPage.jsx'
import Contact from './Components/Contact/Contact.jsx';
import Account from './Components/Account/Account.jsx';
import Health from './pages/Health/Health.jsx';
import { SessionProvider } from './context/SessionContext.jsx';
import LoginRegister from './Components/LoginRegister/LoginRegister.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import Infra_Location from './pages/Infrastructure/Infra.jsx';
import Emergency from './pages/Emergency/Emergency.jsx';
import EventManagement from './pages/EventManagement/EventManagement.jsx';
import AddEvent from './pages/EventManagement/AddEvent.jsx';
import EditEvent from './pages/EventManagement/EditEvent.jsx';
import DeleteEvent from './pages/EventManagement/DeleteEvent.jsx';
import PeerSupport from './pages/Health/PeerSupport.jsx'; 
import ChatPage from './pages/Health/ChatPage.jsx';  
import Maps from './pages/Map/Maps.jsx';
import { useEffect } from 'react';
import ScrollToTop from './Components/ScrollToTop.jsx';
import Reports from './pages/Reports/Reports.jsx';
import AdminControls from './pages/Admin-controls/admin-controls.jsx';
import AddUser from './pages/Admin-controls/add-user.jsx';
import Vouch from './pages/Health/Vouch.jsx';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  },);

  return (
    <div className="App">
      <SessionProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Routes>
            //Public Routes
            <Route exact path="/" element={<LoginRegister />} />
            <Route exact path="/Home" element={<Homepage />} />
            <Route exact path="/Privacy" element={<PrivacyPolicyPage/>}/>
            <Route exact path="/About" element={<About />}/>
            <Route exact path="/Eventpage" element={<EventPage />}/>
            <Route exact path="/Contact" element={<Contact />}/>
            <Route exact path="/EventPage" element={<EventPage />}></Route>
            <Route exact path="/Contact" element={<Contact />}/>
            <Route exact path="/locations" element={<Maps />}/>

            //Protected Routes
            <Route exact path="/Account" element={
              <ProtectedRoute requiredAccess="canAccessAccount"><Account /></ProtectedRoute>
            } 
            />
            <Route exact path="/Health" element={
              <ProtectedRoute requiredAccess="canAccessHealth"><Health /></ProtectedRoute>
            }
            />

            <Route exact path="/Peersupport" element={ 
              <ProtectedRoute requiredAccess="canAccessHealth"><PeerSupport /></ProtectedRoute>
            } 
            />

            <Route path="/chat/:groupID" element={
              <ProtectedRoute requiredAccess="canAccessHealth"><ChatPage/></ProtectedRoute>
            }
            />
              
            <Route exact path="/Infra" element={
              <ProtectedRoute requiredAccess="canAccessInfra"><Infra_Location /></ProtectedRoute>
            }
            />
              
            <Route exact path="/Emergency" element={
              <ProtectedRoute requiredAccess="canAccessEmergency"><Emergency /></ProtectedRoute>
            }
            />
              
            <Route exact path="/EventManagement" element={
              <ProtectedRoute requiredAccess="canManageEvents"><EventManagement /></ProtectedRoute>
            }
            />
              
            <Route exact path="/AddEvent" element={
              <ProtectedRoute requiredAccess="canManageEvents"><AddEvent /></ProtectedRoute>
            }
            />
              
            <Route exact path="/EditEvent" element={
              <ProtectedRoute requiredAccess="canManageEvents"><EditEvent /></ProtectedRoute>
            }
            />
              
            <Route exact path="/DeleteEvent" element={
              <ProtectedRoute requiredAccess="canManageEvents"><DeleteEvent /></ProtectedRoute>
            }
            />
              
            <Route exact path="/Reports" element={
              <ProtectedRoute requiredAccess="canAccessReports"><Reports /></ProtectedRoute>
            }
            />
              
            <Route exact path='/admin-controls' element={
              <ProtectedRoute requiredAccess="canAlterSystem"><AdminControls /></ProtectedRoute>
            } 
            />
              
            <Route exact path="/admin-controls/add-user" element={
              <ProtectedRoute requiredAccess="canAlterSystem"><AddUser /></ProtectedRoute>
            }
            />
              
            <Route exact path='/vouch'  element={
              <ProtectedRoute requiredAccess="canReviewHealth"><Vouch /></ProtectedRoute>
            }
            />

          </Routes>
          <Footer />
        </BrowserRouter>
      </SessionProvider>
    </div>
  );
}

export default App;