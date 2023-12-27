import { Routes, Route } from 'react-router-dom';

import Home from './routes/home';
import Map from './routes/map';

import './App.css';

function App () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/maps" element={<Home />} />
      <Route path="/map/:id" element={<Map />} />
    </Routes>      
  );
}

export default App;