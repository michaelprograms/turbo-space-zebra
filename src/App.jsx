import { Routes, Route } from 'react-router-dom';

import Home from './routes/home';
import Map from './routes/map';

import './App.css';

function App () {
  return (
    <Routes>
      <Route path="/turbo-space-zebra/" element={<Home />} />
      <Route path="/turbo-space-zebra/maps" element={<Home />} />
      <Route path="/turbo-space-zebra/map/:id" element={<Map />} />
    </Routes>
  );
}

export default App;