// utilities/generateToken.js

import jwt from 'jsonwebtoken';

const generateToken = (payload, secret, expiresIn) => {
  try {
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Error generating token');
  }
};

export default generateToken;
