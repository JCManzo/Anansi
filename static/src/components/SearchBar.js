import React, { Component } from 'react';
import './SearchBar.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  onInputChange(term) {
    this.setState({ term });
  }

  render() {
    return (
      <form id="search-bar-form" className="form-inline">
        <div id="search-bar" className="input-group">
          <i className="fa fa-search" />
          <input
            className="form-control rounded-left"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={event => this.onInputChange(event.target.value)}
          />
          {/*<div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">Upload</button>
          </div>*/}
        </div>
      </form>
    );
  }
}

export default SearchBar;
