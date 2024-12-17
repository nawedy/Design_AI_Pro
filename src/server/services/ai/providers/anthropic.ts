import Anthropic from '@anthropic-ai/sdk';
import env from '../../../config/env';
import type { AIProvider } from '../types';

const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY,
});

export const anthropicProvider: AIProvider = {
  name: 'anthropic',
  models: ['claude-3-opus', 'claude-3-sonnet'],
  
  async generateText(prompt: string, model = 'claude-3-sonnet') {
    try {
      const message = await anthropic.messages.create({
        model,
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      return message.content[0].text;
    } catch (error) {
      console.error('Anthropic error:', error);
      throw new Error('Failed to generate text with Anthropic');
    }
  },

  async generateImage() {
    throw new Error('Image generation not supported by Anthropic');
  }
};