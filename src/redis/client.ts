import Redis from 'ioredis';
import { logger } from '../lib/logger.js';

const redisUrl = process.env['REDIS_URL'];
if (!redisUrl) {
  throw new Error('Missing REDIS_URL environment variable');
}

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 200, 5000);
    logger.warn({ attempt: times, delay }, 'Redis reconnecting...');
    return delay;
  },
  lazyConnect: true,
});

redis.on('connect', () => {
  logger.info('Redis connected');
});

redis.on('error', (err) => {
  logger.error({ err }, 'Redis connection error');
});

redis.on('close', () => {
  logger.info('Redis connection closed');
});

export async function connectRedis(): Promise<void> {
  await redis.connect();
}
export async function disconnectRedis(): Promise<void> {
  logger.info('Disconnecting Redis...');
  await redis.quit();
  logger.info('Redis disconnected');
}
