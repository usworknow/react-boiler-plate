import axios from 'axios';
import { get } from '../utils/storage';
import logger from '../utils/logger';
import { TOKEN_KEY } from '../constants';

const baseApi = axios.create({
  baseURL: process.env.API_URL,
});

baseApi.interceptors.request.use(
  async (config) => {
    // Do something before request is sent, like we're inserting a autherization header
    const token = get(TOKEN_KEY);
    // eslint-disable-next-line no-param-reassign
    if (token) config.headers.Authorization = `Bearer ${(token.split('"'))[1]}`
    logger.debug(config.method, config.url, { data: config.data, header: config.headers });
    return config;
  },
  (error) => {
    // Do something with request error
    logger.error(error);
    return Promise.reject(error);
  },
);

export default baseApi;
