import MistralClient from '@mistralai/mistralai';
import env from '../../../config/env';
import type { AIProvider } from '../types';

const mistral = new MistralClient(env.MISTRAL_API_KEY);

export const mistralProvider: AIProvider = {
  name: 'mistral',
  models: ['mistral-large', 'mistral-medium', 'mistral-small'],
  
  async generateText(prompt: string, model = 'mistral-large') {
    try {
      const response = await mistral.chat({
        model,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Mistral error:', error);
      throw new Error('Failed to generate text with Mistral');
    }
  },

  async generateImage() {
    throw new Error('Image generation not supported by Mistral');
  }
};