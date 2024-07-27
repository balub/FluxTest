import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './pages/Projects/Projects';
import NotFound from './pages/NotFound/NotFound';
import SignIn from './pages/SignIn/SignIn';
import Layout from './components/Layout/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
