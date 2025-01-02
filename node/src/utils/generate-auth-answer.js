import crypto from 'crypto';

const generateAuthAnswer = (srvRand, password) => {
  const passwordHash = crypto.createHash('md5')
    .update(Buffer.from(password, 'utf16le'))
    .digest('binary');

  const intermediateHash = crypto.createHash('md5')
    .update(passwordHash, 'binary')
    .update('WebAPI', 'ascii')
    .digest('binary');

  const finalHash = crypto.createHash('md5')
    .update(intermediateHash, 'binary')
    .update(Buffer.from(srvRand, 'hex'))
    .digest('hex');

  return finalHash;
};

export default generateAuthAnswer;
