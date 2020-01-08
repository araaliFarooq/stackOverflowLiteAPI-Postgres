import jwt from 'jsonwebtoken';
import { configurations } from '../config';

export const createToken = async (payload) => {
  const token = await jwt.sign(payload, configurations.JWTSECRETKEY, {
    expiresIn: '1d'
  });
  return token;
};

export const decodeToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, configurations.JWTSECRETKEY);
    return decoded;
  } catch (e) {
    return e.message || 'Error decoding token';
  }
};
