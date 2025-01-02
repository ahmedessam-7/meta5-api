import crypto from 'crypto';

const generateRandomBuffer = () => crypto.randomBytes(16).toString('hex');

export default generateRandomBuffer;
