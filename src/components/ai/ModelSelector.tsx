import React from 'react';
import { useAI } from '../../context/AIContext';

const models = {
  openai: ['gpt-4', 'gpt-3.5-turbo'],
  anthropic: ['claude-3-opus', 'claude-3-sonnet'],
  mistral: ['mistral-large', 'mistral-medium', 'mistral-small']
};

export default function ModelSelector() {
  const { provider, model, setProvider, setModel } = useAI();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          AI Provider
        </label>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="w-full bg-[#393E46] text-white rounded-lg p-2 border border-[#222831] focus:outline-none focus:ring-2 focus:ring-[#FD7014]"
        >
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
          <option value="mistral">Mistral</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Model
        </label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full bg-[#393E46] text-white rounded-lg p-2 border border-[#222831] focus:outline-none focus:ring-2 focus:ring-[#FD7014]"
        >
          {models[provider as keyof typeof models].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
    </div>
  );
}