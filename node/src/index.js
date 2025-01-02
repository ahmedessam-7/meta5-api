import bootstrap from './bootstrap';
import server from './server';
import ws from './ws';

const main = async () => {
  await bootstrap();
  server.launch();
  ws.launch();
};

main();
