import Header from './Components/Header/Header.js'
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Homepage from './pages/Home/Homepage.js';
import Footer from './Components/Footer/Footer.js';
import PrivacyPolicyPage from './pages/Privacy-policy/PrivacyPolicy.js';


function App() {
  return (
    <div className="App">
      
      
       <BrowserRouter>
       <Header/>
        <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/privacy" element={<PrivacyPolicyPage/>}/>
        </Routes>
        <Footer/>
       </BrowserRouter>
    </div>
  );
}

export default App;
