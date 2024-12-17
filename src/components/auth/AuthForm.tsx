import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSuccess: () => void;
}

export default function AuthForm({ type, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name }
          }
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === 'signup' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg bg-[#393E46] text-white px-3 py-2 border border-[#222831] focus:outline-none focus:ring-2 focus:ring-[#FD7014]"
            required
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-lg bg-[#393E46] text-white px-3 py-2 border border-[#222831] focus:outline-none focus:ring-2 focus:ring-[#FD7014]"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-lg bg-[#393E46] text-white px-3 py-2 border border-[#222831] focus:outline-none focus:ring-2 focus:ring-[#FD7014]"
          required
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#FD7014] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          type === 'signup' ? 'Sign Up' : 'Log In'
        )}
      </button>
    </form>
  );
}