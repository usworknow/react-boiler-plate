import { ADD_TODO_ITEM, GET_TODO_LIST, UPDATE_TODO_ITEM, REMOVE_TODO_ITEM, SEARCH_TODO_ITEMS } from './constant';
import { api } from '../../services';

export const getTodoListBySearch = (searchInfo) => async (dispatch) => {
  try {
    const { data } = await api.post(`${process.env.API_URL}/filter-todos`, searchInfo);

    dispatch({ type: SEARCH_TODO_ITEMS, payload: data.todos });

    return todos;
  } catch (error) {
    return error.response.data;
  } 
};

export const getTodoItems = () => async (dispatch) => {
  try {
    const { data } = await api.get(`${process.env.API_URL}/get-todos`);
  
    dispatch({ type: GET_TODO_LIST, payload: data.todos });

    return data.todos;
  } catch (error) {
    return error.response.data;
  }
};

export const addTodoItem = (todoInfo) => async (dispatch) => {
  try {
    const { data } = await api.post(`${process.env.API_URL}/create-todo`, todoInfo);
    
    dispatch({ type: ADD_TODO_ITEM, payload: data.todo });
  
    return data;  
  } catch (error) {
    return error.response.data;
  }
  
};

export const updateTodoItem = (todoInfo) => async (dispatch) => {
  try {
    const { data } = await api.post(`${process.env.API_URL}/update-todo`, todoInfo);

    dispatch({ type: UPDATE_TODO_ITEM, payload: data.todo[0] });

    return todo;
  } catch (error) {
    return error.response.data;
  }
  
};

export const removeTodoItem = (itemIndex) => async (dispatch) => {
  try {
    const { data } = await api.get(`${process.env.API_URL}/delete-todo/${itemIndex}`);
    
    dispatch({ type: REMOVE_TODO_ITEM, payload: { id: itemIndex } });

    return data;
  } catch (error) {
    return error.response.data;
  } 
};
