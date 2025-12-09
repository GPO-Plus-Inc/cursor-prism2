import dotenv from 'dotenv';

dotenv.config();

export type AppEnvironment = {
  nodeEnv: 'development' | 'test' | 'production';
  port: number;
  mongoUri: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  serviceName: string;
};

const env: AppEnvironment = {
  nodeEnv: (process.env.NODE_ENV as AppEnvironment['nodeEnv']) ?? 'development',
  port: Number(process.env.PORT ?? 3333),
  mongoUri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/helios',
  logLevel:
    (process.env.LOG_LEVEL as AppEnvironment['logLevel']) ?? 'info',
  serviceName: process.env.SERVICE_NAME ?? 'helios-fsm-api',
};

export default env;
