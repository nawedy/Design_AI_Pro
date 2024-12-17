import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { prisma } from '../db';
import env from '../config/env';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
      },
    });

    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(user.id)
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(env.JWT_SECRET));

    res.json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(user.id)
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(env.JWT_SECRET));

    res.json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;