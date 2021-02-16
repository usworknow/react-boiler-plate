/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/label-has-for */
// @flow
import React from 'react';

class SearchComponent extends React.Component {

  handleSearch = (event) => {
    this.props.handleSearch(event.target.value);
  };

  render() {
    return (
      <div className="search">
        <label>Search</label>
        <input
          className="form-control"
          name="search_by"
          onChange={this.handleSearch}
          placeholder="Enter..."
          autoComplete="off"
        />
      </div>
    );
  }
}

export default SearchComponent;
