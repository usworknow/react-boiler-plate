import { REMOVE_USER_DATA, SET_USER_DATA, UPDATE_USER_DATA } from './constant';

const DEFAULT_STATE = {};

const authReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload };
    case UPDATE_USER_DATA:
      return { ...state, ...action.payload };
    case REMOVE_USER_DATA:
      return {};
    default:
      return state;
  }
};

export default authReducer;
