import OpenAI from 'openai';
import env from '../config/env';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function generateDesignSuggestions(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
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

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating design suggestions:', error);
    throw new Error('Failed to generate design suggestions');
  }
}

export async function generateImage(prompt: string) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
}