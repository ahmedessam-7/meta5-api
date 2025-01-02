import express from 'express';
import cors from 'cors';
import compression from 'compression';

import router from './router';

import config from '../config';

const server = express();

server.use(cors());
server.use(compression());
server.use(express.json({ limit: '1MB' }));
server.use(express.urlencoded({ extended: true, limit: '1MB' }));

server.use('/', router);

server.launch = () => server.listen(config.server.port, config.server.host);

export default server;
