import https from 'https';
import url from 'url';
import axios from 'axios';

import config from '../config';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  maxSockets: 1,
  keepAlive: true,
});

const baseURL = url.format({
  protocol: 'https',
  hostname: config.meta.host,
  port: config.meta.port,
});

const meta = axios.create({
  httpsAgent,
  baseURL,
});

export default meta;
