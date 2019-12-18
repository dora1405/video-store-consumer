import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class MovieSearch extends Component {
  constructor() {
    super();

    this.state = {
      resultList: [],
      currentMovie: undefined,
      searchTerm: '',
      error: '',
    };
  }
  
  onInputChange = (event) => {
    const updatedState = {};

    const field = event.target.name;
    const value = event.target.value;
    updatedState[field] = value;
    this.setState(updatedState);
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.searchQuery()

    this.setState({
      searchTerm: '',
    });
  };

  searchQuery = () => {

    axios.get('http://localhost:3000/movies?query=' + this.state.searchTerm)
      .then((response) => {
        console.log(response)
        this.setState({
          resultList: response.data
        });
        console.log('******************')
        console.log(this.state.resultList)
      })
      .catch((error) => {
        this.setState({
          error: error.message
        })
      })
  }



  render () {
    const searchResults = this.state.resultList.map((search) => {
      return(
        <p>{search.title}</p>
      )
    })
    return (
      <section>
        <h2>Movie Page</h2>
        <section>
          <div>
            <label className="search-bar--label" htmlFor="searchBar">Search</label>
            <input
            onChange={this.onInputChange}
            name="searchTerm"
            value={this.state.searchTerm}
            id="searchTerm"
            className="search-term"
          />
          </div>
          <input
            onClick={this.onSubmitHandler}
            type="submit"
            name="submit"
            value="Search for Movie"
            className="search-bar"
          />
        </section>
        <section>

          {searchResults}
        </section>
      </section>
    )
  }

}
export default MovieSearch;