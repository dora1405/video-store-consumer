import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class MovieSearch extends Component {
  constructor(props) {
    super(props);

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

  addMovieOnSubmit = (movie) => {
    
    axios.get('http://localhost:3000')
    .then((response) => {


      if (response.data.find(listItem => listItem.external_id === movie.external_id)) {

        console.log("Already exists in movie library")

      } else {
        return(
          axios.post('http://localhost:3000/movies', movie)
          .catch(() => {
            console.log("Can't get movie")
            })
          )
      }
    })
    .catch(() => {
      return ('Movie not added')
    });

  };

  searchQuery = () => {

    axios.get('http://localhost:3000/movies?query=' + this.state.searchTerm)
      .then((response) => {
        console.log(response)
        this.setState({
          resultList: response.data
        });
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
        <ul>
          <img src={search.image_url} alt={search.title} />
          <p>
            <input
              onClick={()=> {this.addMovieOnSubmit(search)}}
              type="submit"
              name="submit"
              value="Add Movie to Inventory"
              className="add-movie"
            />
          </p>
          <p>{search.title}</p>
          <p>{search.overview}</p>
        </ul>

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