/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/label-has-for */
// @flow
import React from 'react';

class CreateTodoSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: {} };
  }

  handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    const { item } = this.state;

    this.setState({ item: { ...item, [name]: value } });
  };

  handleAddTodo = (event) => {
    const { item } = this.state;
    this.props.handleAddTodo(event, item);
  };

  render() {
    return (
      <React.Fragment>
        <div className="lgMenu enter">
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={(e) => {
              this.props.isShowCreateTodoView(e);
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <form onSubmit={this.handleAddTodo}>
            <div className="form-group">
              <label>Title</label>
              <input
                className="form-control"
                name="title"
                onChange={this.handleChange}
                placeholder="Enter title"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                onChange={this.handleChange}
                rows="5"
                placeholder="Enter description"
                style={{ resize: 'none' }}
              />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select className="form-control" name="priority" onChange={this.handleChange}>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select className="form-control" name="status" onChange={this.handleChange}>
                <option value="0">Incomplete</option>
                <option value="1">Complete</option>
              </select>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">
              CREATE
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateTodoSideBar;
