import net from 'net';
import lodash from 'lodash';

import ws from '../ws';

import config from '../config';

const socket = new net.Socket();

socket.on('data', (buffer) => {
  const message = buffer.toString('utf8');

  lodash.forEach([...ws.clients], (client) => {
    client.send(message);
  });
});

socket.establish = () => socket.connect({ host: config.socket.host, port: config.socket.port });

export default socket;
