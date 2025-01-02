import net from 'net';

import config from '../config';

const socket = new net.Socket();

socket.establish = () => socket.connect({ host: config.socket.host, port: config.socket.port });

export default socket;
