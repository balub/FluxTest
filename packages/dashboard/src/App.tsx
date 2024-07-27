import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './pages/ProjectList/ProjectList';
import NotFound from './pages/NotFound/NotFound';
import SignIn from './pages/SignIn/SignIn';
import Layout from './components/Layout/Layout';
import Project from './pages/Project/Project';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProjectList />} />
          <Route path="/project/:id" element={<Project />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
