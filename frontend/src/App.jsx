import Header from './Components/Header/Header.jsx'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Home/Homepage.jsx';
import Footer from './Components/Footer/Footer.jsx';
import PrivacyPolicyPage from './pages/Privacy-policy/PrivacyPolicy.jsx';
import About from './Components/About/About.jsx';
import EventPage from './pages/Events-Page/EventsPage.jsx'
import Contact from './Components/Contact/Contact.jsx';
import Health from './pages/Health/Health.jsx';
import { SessionProvider } from './context/SessionContext.jsx';
import LoginRegister from './Components/LoginRegister/LoginRegister.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import Maps from './pages/Map/Maps.jsx';


function App() {
  return (
    <div className="App">
      <SessionProvider>
       <BrowserRouter>
       <Header/>
        <Routes>
            //Public Routes
            <Route exact path="/" element={<LoginRegister/>} />
            <Route exact path="/Home" element={<Homepage />} />
            <Route exact path="/Privacy" element={<PrivacyPolicyPage/>}/>
            <Route exact path="/About" element={<About />}/>
            <Route exact path="/Eventpage" element={<EventPage />}/>
            <Route exact path="/Contact" element={<Contact />}/>
            
            //Protected Routes
            <Route exact path="/Health" element={
                <ProtectedRoute requiredAccess="canAccessHealth"><Health /></ProtectedRoute>
              }
            />
            <Route exact path="/EventPage" element={<EventPage />}></Route>
            <Route exact path="/Contact" element={<Contact />}/>
            <Route exact path="/map" element={<Maps/>}/>
        </Routes>
        <Footer/>
       </BrowserRouter>
      </SessionProvider>
    </div>
  );
}

export default App;