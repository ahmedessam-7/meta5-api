import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const config = {
  server: {
    host: String(env.HTTP_HOST),
    port: Number(env.HTTP_PORT),
  },
  ws: {
    host: String(env.WEBSOCKET_HOST),
    port: Number(env.WEBSOCKET_PORT),
  },
  socket: {
    host: String(env.SOCKET_HOST),
    port: Number(env.SOCKET_PORT),
  },
  meta: {
    host: String(env.META_HOST),
    port: Number(env.META_PORT),
    login: Number(env.META_LOGIN),
    password: String(env.META_PASSWORD),
    version: Number(env.META_VERSION),
    agent: String(env.META_AGENT),
  },
};

export default config;
