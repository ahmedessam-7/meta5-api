import http from 'http';
import WebSocket from 'ws';

import config from '../config';

const server = http.createServer();

const ws = new WebSocket.Server({ server });

ws.launch = () => server.listen(config.ws.port, config.ws.host);

export default ws;
