
import './App.css';
import LandingPage from './vendorDashBoard/pages/LandingPage';
import {Routes , Route} from 'react-router-dom';
function App() {
  return (
    <div >
      <Routes>
        <Route  path='/' element = {<LandingPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
