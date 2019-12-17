import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, searchChangeCallback }) => {
  return (
    <section>
      <div>
        <label className="search-bar--label" htmlFor="searchBar">Search</label>
      </div>
      <input
        onChange={(event) => { searchChangeCallback(event.target.value) }}
        value={searchTerm}
        name="searchBar"
        id="searchBar"
        className="search-bar"
      />
    </section>
  );
};

SearchBar.propTypes = {
  searchChangeCallback: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default SearchBar;