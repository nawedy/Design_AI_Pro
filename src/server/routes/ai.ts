import { Router } from 'express';
import { z } from 'zod';
import { generateDesignSuggestions, generateImage } from '../utils/ai';
import { authMiddleware } from '../middleware/auth';

const router = Router();

const designPromptSchema = z.object({
  prompt: z.string().min(10),
});

router.post('/suggestions', authMiddleware, async (req, res) => {
  try {
    const { prompt } = designPromptSchema.parse(req.body);
    const suggestions = await generateDesignSuggestions(prompt);
    res.json({ suggestions });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to generate design suggestions' });
  }
});

router.post('/generate-image', authMiddleware, async (req, res) => {
  try {
    const { prompt } = designPromptSchema.parse(req.body);
    const imageUrl = await generateImage(prompt);
    res.json({ imageUrl });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to generate image' });
  }
});

export default router;