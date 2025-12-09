import { MongoClient, type Collection, type Db } from 'mongodb';

import env from './env';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export const getMongoClient = async () => {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(env.mongoUri, {
    appName: env.serviceName,
  });

  cachedClient = await client.connect();
  cachedDb = cachedClient.db();
  return cachedClient;
};

export const getDb = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await getMongoClient();
  cachedDb = client.db();
  return cachedDb;
};

export const getCollection = async <T extends Record<string, unknown>>(name: string) => {
  const db = await getDb();
  return db.collection<T>(name);
};

export type MongoCollection<T> = Collection<T>;
