import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import QRCodeDisplay from './component/QRCodeDisplay';
import QRCodeGenerator from './component/QRCodeGenerator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodeGenerator />} />
        <Route path="/display" element={<QRCodeDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
