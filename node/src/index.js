import bootstrap from './bootstrap';
import server from './server';
import ws from './ws';
import socket from './socket';

const main = async () => {
  await bootstrap();
  server.launch();
  ws.launch();
  socket.establish();
};

main();
