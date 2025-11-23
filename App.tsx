import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AuthScreen from './components/AuthScreen';

type ViewState = 'landing' | 'auth' | 'dashboard';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const handleStartLogin = () => {
    setCurrentView('auth');
  };

  const handleAuthenticated = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('landing');
  };

  const handleBackToLanding = () => {
      setCurrentView('landing');
  }

  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen">
      {currentView === 'landing' && (
        <LandingPage onLogin={handleStartLogin} />
      )}
      
      {currentView === 'auth' && (
        <AuthScreen onAuthenticated={handleAuthenticated} onBack={handleBackToLanding} />
      )}

      {currentView === 'dashboard' && (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;