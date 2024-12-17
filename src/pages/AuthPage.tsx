import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import AuthForm from '../components/auth/AuthForm';

export default function AuthPage() {
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');

  const handleSuccess = () => {
    // Handle successful authentication
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-[#222831] flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <Sparkles className="w-12 h-12 text-[#FD7014] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">
            {authType === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-400">
            {authType === 'login'
              ? 'Log in to access your designs'
              : 'Sign up to start creating'}
          </p>
        </div>

        <div className="bg-[#393E46] rounded-xl p-6 shadow-xl">
          <AuthForm type={authType} onSuccess={handleSuccess} />
          
          <div className="mt-4 text-center">
            <p className="text-gray-400">
              {authType === 'login'
                ? "Don't have an account? "
                : 'Already have an account? '}
              <button
                onClick={() => setAuthType(authType === 'login' ? 'signup' : 'login')}
                className="text-[#FD7014] hover:underline"
              >
                {authType === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}