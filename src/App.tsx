import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import EIPListPage from './pages/EIPListPage';
import EIPDetailPage from './pages/EIPDetailPage';
import SearchPage from './pages/SearchPage';
import ProjectsPage from './pages/ProjectsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DiscussionsPage from './pages/DiscussionsPage';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/eips" element={<EIPListPage />} />
          <Route path="/eip/:number" element={<EIPDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/discussions" element={<DiscussionsPage />} />
        </Routes>
        <AIAssistant />
      </div>
    </Router>
  );
}

export default App;