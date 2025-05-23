
import './App.css';
import NotFound from './vendorDashBoard/components/NotFound/NotFound';
import LandingPage from './vendorDashBoard/pages/LandingPage';
import {Routes , Route} from 'react-router-dom';
function App() {
  return (
    <div >
      <Routes>
        <Route  path='/' element = {<LandingPage/>}/>
        <Route path='/*' element = {<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
