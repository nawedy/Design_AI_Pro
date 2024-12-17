import React, { createContext, useContext, useState } from 'react';

interface AIContextType {
  provider: string;
  model: string;
  setProvider: (provider: string) => void;
  setModel: (model: string) => void;
  generating: boolean;
  setGenerating: (generating: boolean) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState('openai');
  const [model, setModel] = useState('gpt-4');
  const [generating, setGenerating] = useState(false);

  return (
    <AIContext.Provider value={{
      provider,
      model,
      setProvider,
      setModel,
      generating,
      setGenerating
    }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}