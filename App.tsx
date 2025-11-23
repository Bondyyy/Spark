import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

type ViewState = 'landing' | 'dashboard';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const handleLogin = () => {
    // In a real app, this would handle authentication
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('landing');
  };

  return (
    <div className="font-sans text-slate-900">
      {currentView === 'landing' ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;