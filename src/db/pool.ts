import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import { logger } from '../lib/logger.js';

const connectionString = process.env['DATABASE_URL'];
if (!connectionString) {
  logger.warn('DATABASE_URL is not set; database operations may fail until it is configured');
}

export const pool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on('error', (err) => {
  logger.error({ err }, 'Unexpected error on idle database client');
});

pool.on('connect', () => {
  logger.debug('New database client connected');
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<QueryResult<T>> {
  const start = Date.now();
  const result = await pool.query<T>(text, params);
  const duration = Date.now() - start;

  if (duration > 200) {
    logger.warn({ duration, query: text }, 'Slow query detected');
  } else {
    logger.debug({ duration, rows: result.rowCount }, 'Query executed');
  }

  return result;
}

export async function getClient(): Promise<PoolClient> {
  return pool.connect();
}
export async function closePool(): Promise<void> {
  logger.info('Draining database connection pool...');
  await pool.end();
  logger.info('Database pool closed');
}
