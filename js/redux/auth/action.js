import { SET_USER_DATA, REMOVE_USER_DATA } from './constant';
import { api } from '../../services';
import { set, remove } from '../../utils/storage';
import { TOKEN_KEY } from '../../constants/app';

export const login = (credential) => async (dispatch) => {
  // eslint-disable-next-line no-unused-vars
  try {
    const { data } = await api.post(`${process.env.API_URL}/login`, credential);
    if(data.success) {
      // save token
      set(TOKEN_KEY, data.info.token);
      // store user data
      dispatch({ type: SET_USER_DATA, payload:  data.info.user });
    }
    // return user data
    return data; 
  } catch (error) {
    return error.response.data;
  }
};

export const register = (user) => async () => {
  try {
    const { data } = await api.post(`${process.env.API_URL}/register`, user);

    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
  
};

export const logout = () => async (dispatch) => {
  await api.get(`${process.env.API_URL}/logout`);
  // remove token
  remove(TOKEN_KEY);
  // remove user data
  dispatch({ type: REMOVE_USER_DATA });
};

// etc
