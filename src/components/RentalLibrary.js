import React, {Component} from 'react';
import axios from 'axios';
import {
  Card, Container, Col, Row, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './RentalLibrary.css'


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
    const movies = this.state.movieList.map((movie, i) => {

      return(
        <Container key={i}className="flex-wrap">
          <Card className="d-flex flex-column card-class flex-wrap">
            <CardTitle className="card-title-class">{movie.title}</CardTitle>
            <img className="image-class" width="100%" src={movie.image_url} alt={movie.title} />
            <CardBody>{movie.overview}</CardBody>
            <p className="button-class">
              <input
                onClick={()=> 
                  {this.props.selectRentalCallback(movie)}}
                type="submit"
                name="submit"
                value="Select Movie Rental"
                className="rent-movie"
              />
            </p>
          </Card>
        </Container>
      )
    })

    
    return (
      <div>{movies}</div>
    )
  }
}

export default RentalLibrary;