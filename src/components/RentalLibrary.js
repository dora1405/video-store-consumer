import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import MovieSearch from './MovieSearch';


class RentalLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000')
      .then((response) => {
        this.setState({
          movieList: response.data
        });
        
      })
      .catch(() => {
        this.setState({
          error: 'nope!'
        })
      });
  }


  
  render () {
    const movies = this.state.movieList.map((movie) => {

      return(
        <ul>
          <img src={movie.image_url} alt={movie.title} />
          <p>
            <input
              onClick={()=> 
                {this.props.selectRentalCallback(movie)}}
              type="submit"
              name="submit"
              value="Select Movie Rental"
              className="rent-movie"
            />
          </p>
          <p>{movie.title}</p>
          <p>{movie.overview}</p>
        </ul>
      )
    })

    
    return (
      <div>{movies}</div>
    )
  }
}

export default RentalLibrary;