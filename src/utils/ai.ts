import { openAIProvider } from '../server/services/ai/providers/openai';
import { anthropicProvider } from '../server/services/ai/providers/anthropic';
import { mistralProvider } from '../server/services/ai/providers/mistral';

const providers = {
  openai: openAIProvider,
  anthropic: anthropicProvider,
  mistral: mistralProvider
};

export async function generateDesign(prompt: string, provider = 'openai') {
  const selectedProvider = providers[provider as keyof typeof providers];
  if (!selectedProvider) {
    throw new Error('Invalid AI provider');
  }

  return selectedProvider.generateText(prompt);
}

export async function generateImage(prompt: string, provider = 'openai') {
  const selectedProvider = providers[provider as keyof typeof providers];
  if (!selectedProvider) {
    throw new Error('Invalid AI provider');
  }

  return selectedProvider.generateImage(prompt);
}