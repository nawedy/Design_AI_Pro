import OpenAI from 'openai';
import env from '../../../config/env';
import type { AIProvider } from '../types';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const openAIProvider: AIProvider = {
  name: 'openai',
  models: ['gpt-4', 'gpt-3.5-turbo'],
  
  async generateText(prompt: string, model = 'gpt-4') {
    try {
      const completion = await openai.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content: "You are an expert UI/UX designer. Generate detailed design suggestions based on the user's requirements."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
      });

      return completion.choices[0].message.content || '';
    } catch (error) {
      console.error('OpenAI error:', error);
      throw new Error('Failed to generate text with OpenAI');
    }
  },

  async generateImage(prompt: string) {
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
      });

      return response.data[0].url || '';
    } catch (error) {
      console.error('OpenAI image generation error:', error);
      throw new Error('Failed to generate image with OpenAI');
    }
  }
};