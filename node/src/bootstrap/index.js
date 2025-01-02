import authenticateConnection from '../utils/authenticate-connection';

const bootstrap = async () => {
  await authenticateConnection();
};

export default bootstrap;
