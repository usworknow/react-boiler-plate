import { ADD_TODO_ITEM, GET_TODO_LIST, UPDATE_TODO_ITEM, REMOVE_TODO_ITEM, SEARCH_TODO_ITEMS } from './constant';

const DEFAULT_STATE = [];

const todoReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SEARCH_TODO_ITEMS:
      return action.payload;
    case GET_TODO_LIST:
      return action.payload;
    case ADD_TODO_ITEM:
      return [ ...action.payload, ...state ];
    case UPDATE_TODO_ITEM:
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
      );
    case REMOVE_TODO_ITEM:
      return state.filter((todo) => todo.id !== action.payload.id);
    default:
      return state;
  }
};

export default todoReducer;
