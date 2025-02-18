import Header from './Components/Header/Header.jsx'
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Homepage from './Home/Homepage.jsx';
import Footer from './Components/Footer/Footer.jsx';
import PrivacyPolicyPage from './pages/Privacy-policy/PrivacyPolicy.jsx';
import About from './Components/About/About.jsx';

function App() {
  return (
    <div className="App">
      
       <BrowserRouter>
       <Header/>
        <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/privacy" element={<PrivacyPolicyPage/>}/>
            <Route exact path="/about" element={<About />}/>
        </Routes>
        <Footer/>
       </BrowserRouter>
    </div>
  );
}

export default App;