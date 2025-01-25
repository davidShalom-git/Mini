import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Exam from './Component/Exam';
import HallTicket from './Component/HallTicket';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Exam />} />
          <Route path='/hall' element={<HallTicket />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;