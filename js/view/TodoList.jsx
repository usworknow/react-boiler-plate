/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/label-has-for */
// @flow
import React from 'react';
import { connect } from 'react-redux';

// Actions
import { addTodoItem, getTodoItems, getTodoListBySearch, updateTodoItem, removeTodoItem } from '../redux/todo/action';
import { logout } from '../redux/auth/action';
import { loggedIn } from '../utils/storage';

// Components
import CreateTodoSideBar from '../components/CreateTodoSideBar';
import UpdateTodoSideBar from '../components/UpdateTodoSideBar';
import SearchComponent from '../components/SearchComponent';


// CSS
import '../../public/scss/todo.scss';

class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowCreateView: false,
      isShowUpdateView: false,
      selectedTodo: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getTodoItems());
  }

  handleLogOut = () => {
    const { dispatch } = this.props;

    dispatch(logout()).then(() => {
      this.props.history.push("/sign-in");
    });
  }

  isShowCreateTodoView = (e) => {
    e.stopPropagation();
    this.setState(state => ({ isShowCreateView: !state.isShowCreateView, selectedTodo: {} }));
  };

  isShowUpdateTodoView = (e, id) => {
    e.stopPropagation();
    /**
     * Filter Todo Item By id to show in.
     */
    if (id) {
      const { todos } = this.props;
      const selectedTodo = todos.filter((item) => {
        return item.id === id;
      });

      this.setState({ isShowUpdateView: true, selectedTodo: selectedTodo[0] });
    } else {
      /**
       * Close the sidebar.
       */
      this.setState({ isShowUpdateView: false });
    }
  };

  handleUpdateTodo = (event, item) => {
    event.preventDefault();
    const { dispatch } = this.props;

    // Update todo item.
    dispatch(updateTodoItem(item));
  };

  handleAddTodo = (event, item) => {
    event.preventDefault();
    const { dispatch } = this.props;

    // Add todo item.
    dispatch(addTodoItem(item));
  };

  handlePriorityValue = (value) => {
    console.log("value", value);
    if (value === 1 || isNaN(value)) return 'Low';
    else if (value === 2) return 'Medium';

    return 'High';
  };

  handleRemoveTodo = (e, id) => {
      e.stopPropagation();

      const { dispatch } = this.props;
      this.setState({isShowCreateView: false});

      // Remove todo item.
      dispatch(removeTodoItem(id));
  }

  handleSidebar = () => {
      this.setState({ isShowCreateView: false, isShowUpdateView: false })
  }

  handleSearch = (value) => {
    const { dispatch } = this.props;

    // Search by value to get specific todo items.
    dispatch(getTodoListBySearch({ 'search_by': value }));

    // If the value is empty string. then, show all todo items synchronously.
    if(!value)
        dispatch(getTodoItems());
  }

  render() {
    const { todos } = this.props;
    const { isShowCreateView, isShowUpdateView, selectedTodo } = this.state;

    return (
      <React.Fragment>
        {loggedIn() && <button className="btn btn-light logout_btn" onClick={this.handleLogOut}>Log Out</button>}
        <div className="container">
            <div className="col-md-6 col-xs-12">
                <SearchComponent handleSearch={this.handleSearch} />
            </div>
        </div>
        <div className="container" onClick={this.handleSidebar}>
          <div className="col-md-6 col-xs-12">
            <div className="inner">
              <div className="header">
                <h3>Todo</h3>
                <div id="z_button">
                  <div id="z_plus" onClick={this.isShowCreateTodoView}>
                    +
                  </div>
                </div>
              </div>
              <div className="todo-lists">
              {todos &&
                todos
                  .filter((item) => parseInt(item.status) !== 1)
                  .map((item, index) => (
                    <div
                      className="item"
                      onClick={(e) => {
                        this.isShowUpdateTodoView(e, item.id);
                      }}
                      key={index}
                    >
                      <p className="title">{item.title}</p>
                      <span className="description">{item.description}</span>
                      <div className="priority">
                        <button type="button" className={`btn btn-${isNaN(item.priority) ? item.priority : '1' }`}>
                          {this.handlePriorityValue(parseInt(item.priority))}
                        </button>
                        <button type="button" className="close" aria-label="Close" onClick={(e) => {this.handleRemoveTodo(e, item.id)}}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className="inner">
              <div className="header">
                <h3>Done</h3>
              </div>
              <div className="todo-lists">
              {todos &&
                todos
                  .filter((item) => item.status && parseInt(item.status) !== 0)
                  .map((item, index) => (
                    <div
                      className="item"
                      onClick={(e) => {
                        this.isShowUpdateTodoView(e, item.id);
                      }}
                      key={index}
                    >
                      <p className="title">{item.title}</p>
                      <span className="description">{item.description}</span>
                      <div className="priority">
                        <button type="button" className={`btn btn-${item.priority}`}>
                          {this.handlePriorityValue(parseInt(item.priority))}
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
            </div>
          </div>
        </div>
        {isShowCreateView && (
          <CreateTodoSideBar handleAddTodo={this.handleAddTodo} isShowCreateTodoView={this.isShowCreateTodoView} />
        )}
        {isShowUpdateView && (
          <UpdateTodoSideBar
            handleUpdateTodo={this.handleUpdateTodo}
            item={selectedTodo}
            isShowUpdateTodoView={this.isShowUpdateTodoView}
          />
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  todos: state.todos,
});
export default connect(mapStateToProps)(TodoList);
