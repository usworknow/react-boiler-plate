import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import todoReducer from './todo/reducer';

export default combineReducers({
  todos: todoReducer,
  auth: authReducer,
});
