import Header from './Components/Header/Header.jsx'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Home/Homepage.jsx';
import Footer from './Components/Footer/Footer.jsx';
import PrivacyPolicyPage from './pages/Privacy-policy/PrivacyPolicy.jsx';
import About from './Components/About/About.jsx';
import EventPage from './pages/Events-Page/EventsPage.jsx'
import Contact from './Components/Contact/Contact.jsx';

function App() {
  return (
    <div className="App">
      
       <BrowserRouter>
       <Header/>
        <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/privacy" element={<PrivacyPolicyPage/>}/>
            <Route exact path="/About" element={<About />}/>
            <Route exact path="/EventPage" element={<EventPage />}></Route>
            <Route exact path="/Contact" element={<Contact />}/>
        </Routes>
        <Footer/>
       </BrowserRouter>
    </div>
  );
}

export default App;