import { Router } from 'express';

import meta from '../../meta';
import logger from '../../logger';

import authenticateConnection from '../../utils/authenticate-connection';

const router = Router();

router.all(/^(\/api\/).+/, async (req, res) => {
  try {
    const { method, url, body } = req;

    const metaRes = await meta({
      method,
      url,
      data: body,
    });

    res.json(metaRes.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.message);

    logger.error('Because of an invalid http request, the connection has been terminated');
    logger.warn('Trying to reconnect...');

    authenticateConnection();
  }
});

export default router;
