import bootstrap from './bootstrap';
import server from './server';

const main = async () => {
  await bootstrap();
  server.launch();
};

main();
