import meta from '../meta';
import logger from '../logger';

import generateAuthAnswer from './generate-auth-answer';
import generateRandomBuffer from './generate-random-buffer';

import config from '../config';

const authenticateConnection = async () => {
  try {
    const authStartRes = await meta({
      method: 'GET',
      url: '/api/auth/start',
      params: {
        type: 'manager',
        login: config.meta.login,
        version: config.meta.version,
        agent: config.meta.agent,
      },
    });

    const authAnswer = generateAuthAnswer(authStartRes.data.srv_rand, config.meta.password);
    const randomBuffer = generateRandomBuffer();

    await meta({
      method: 'GET',
      url: '/api/auth/answer',
      params: {
        srv_rand_answer: authAnswer,
        cli_rand: randomBuffer,
      },
    });

    logger.info('Establishing a successful connection');
  } catch (error) {
    logger.error('Unable to establish a connection');
  }
};

export default authenticateConnection;
