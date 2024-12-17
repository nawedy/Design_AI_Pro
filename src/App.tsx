import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './components/Dashboard';
import { AIProvider } from './context/AIContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#222831] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FD7014]"></div>
      </div>
    );
  }

  if (!user) {
    return window.location.pathname === '/auth' ? <AuthPage /> : <LandingPage />;
  }

  return (
    <AIProvider>
      <WorkspaceProvider>
        <Dashboard />
      </WorkspaceProvider>
    </AIProvider>
  );
}

export default App;