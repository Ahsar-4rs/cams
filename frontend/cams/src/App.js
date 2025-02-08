import Header from './Components/Header/Header.js'
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Homepage from './pages/Home/Homepage.js';
import Footer from './Components/Footer/Footer.js';


function App() {
  return (
    <div className="App">
      
      
       <BrowserRouter>
       <Header/>
        <Routes>
            <Route exact path="/" element={<Homepage/>} />
        </Routes>
        <Footer/>
       </BrowserRouter>
    </div>
  );
}

export default App;
