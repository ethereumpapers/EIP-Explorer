import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import EIPListPage from './pages/EIPListPage';
import EIPDetailPage from './pages/EIPDetailPage';
import SearchPage from './pages/SearchPage';
import ProjectsPage from './pages/ProjectsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ResearchAIAssistant from './components/ResearchAIAssistant';
import ResearchAnimations from './components/ResearchAnimations';

// Add error boundary for debugging
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error?: Error}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-300 mb-4">Check the console for details</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-accent-500 text-white px-4 py-2 rounded-lg hover:bg-accent-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-slate-900 relative overflow-hidden">
          {/* Research Animations Background */}
          <ResearchAnimations />
          
          {/* Main Content */}
          <div className="relative z-10">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/eips" element={<EIPListPage />} />
              <Route path="/eip/:number" element={<EIPDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </div>
          
          {/* New Research AI Assistant */}
          <ResearchAIAssistant />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;