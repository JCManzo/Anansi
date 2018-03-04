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
      <form id="search-bar-form" className="form-inline my-2 my-lg-0">
        <div id="search-bar" className="input-group">
          <i className="fa fa-search" />
          <input
            className="form-control rounded-left mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={event => this.onInputChange(event.target.value)}
          />
        </div>
      </form>
    );
  }
}

export default SearchBar;
