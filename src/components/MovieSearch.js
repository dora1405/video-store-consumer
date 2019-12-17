import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar'

class MovieSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: [],
      currentPet: undefined,
      searchTerm: '',
      error: '',
    };
  }





  render () {
    return (
      
      <section>
        <h2>Movie Page</h2>
        <SearchBar/>
      </section>
    )
  }

}
export default MovieSearch;