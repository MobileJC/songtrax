// Import libraries
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';

// Import pages
import SampleCreateEdit from './pages/SampleCreateEdit';
import SampleList from './pages/SampleList';
import SampleShare from './pages/SampleShare';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';

// Import css
import './starterstyles.css';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SampleList />} />
        <Route path="/SampleCreateEdit/:id" element={<SampleCreateEdit />} />
        <Route path="/SampleShare/:id" element={<SampleShare />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
