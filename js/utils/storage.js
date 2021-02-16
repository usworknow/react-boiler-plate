import logger from './logger';
import { TOKEN_KEY } from '../constants';

export const set = (name, value) => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

export const get = (name) => {
  try {
    return localStorage.getItem(name);
  } catch (err) {
    logger.error(err);
    return false;
  }
};

export const remove = (name) => {
  try {
    localStorage.removeItem(name);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

export const loggedIn = () => {
  const token = get(TOKEN_KEY);
  return !!token;
}
