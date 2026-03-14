// src/config/env.ts
// Central environment variable validation — Zod throws at startup if anything
// is missing, preventing cryptic runtime crashes deep inside a request.
// Note: dotenv is loaded by index.ts (import 'dotenv/config') before any other
// module is imported — no need to call it here.

import { z } from 'zod';

const envSchema = z.object({
  // ... your existing env vars (DATABASE_URL, REDIS_URL, JWT_SECRET, etc.)

  // ADD THIS LINE:
  GEMINI_API_KEY: z.string().min(1, 'GEMINI_API_KEY is required'),
});

// ... rest of your existing env.ts code
export const env = envSchema.parse(process.env);