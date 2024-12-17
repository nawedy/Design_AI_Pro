import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  OPENAI_API_KEY: z.string(),
  ANTHROPIC_API_KEY: z.string(),
  MISTRAL_API_KEY: z.string(),
  UNSPLASH_ACCESS_KEY: z.string(),
  PEXELS_API_KEY: z.string(),
  PIXABAY_API_KEY: z.string(),
});

const env = envSchema.parse(process.env);

export default env;