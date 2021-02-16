/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/label-has-for */
// @flow
import React from 'react';

class UpdateTodoSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: {} };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ item: this.props.item });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ item: this.props.item });
    }
  }

  handleUpdateTodo = (event) => {
    const { item } = this.state;
    this.props.handleUpdateTodo(event, item);
  };

  handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    const { item } = this.state;

    this.setState({ item: { ...item, [name]: value } });
  };

  render() {
    const { item } = this.state;

    return (
      <React.Fragment>
        <div className="lgMenu enter">
          <form onSubmit={this.handleUpdateTodo}>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={(e) => {this.props.isShowUpdateTodoView(e)}}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="form-group">
              <label>Title</label>
              <input
                className="form-control"
                name="title"
                onChange={this.handleChange}
                value={item.title || ''}
                placeholder="Enter title"
                disabled={item.status === 1}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                onChange={this.handleChange}
                value={item.description || ''}
                rows="5"
                placeholder="Enter description"
                style={{ resize: 'none' }}
                disabled={item.status === 1}
              />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                className="form-control"
                name="priority"
                onChange={this.handleChange}
                value={item.priority || ''}
                disabled={item.status === 1}
              >
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                name="status"
                onChange={this.handleChange}
                value={item.status || ''}
                disabled={item.status === 1}
              >
                <option value={0}>Incomplete</option>
                <option value={1}>Complete</option>
              </select>
            </div>

            {!parseInt(item.status) && (
              <button type="submit" className="btn btn-dark btn-lg btn-block">
                UPDATE
              </button>
            )}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default UpdateTodoSideBar;
