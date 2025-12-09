import { RedisOptions } from 'ioredis';

const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6379';

export const redisOptions: RedisOptions = {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  lazyConnect: true,
  connectionName: 'helios-fsm-api',
  // URL parsing handled by ioredis constructor.
};

export const getRedisUrl = () => redisUrl;
