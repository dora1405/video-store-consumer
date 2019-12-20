import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CustomerList from './components/CustomerList'
import MovieSearch from './components/MovieSearch'
import RentalLibrary from './components/RentalLibrary'
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCustomer: '',
      selectedMovie: '',
      error: '',
    };
  }

  selectRental = (rental) => {
    this.setState({
      selectedMovie: rental.title
    })
      
  }

  selectCustomer = (customer) => {
    this.setState({
      selectedCustomer: customer
    })
      
  }

  checkout = () => {
    let movieTitle = this.state.selectedMovie;
    console.log(movieTitle)
    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate()+7);
    console.log(dueDate)
    let params = {
      customer_id: this.state.selectedCustomer.id,
      due_date: dueDate.toString()
    }

    axios.post(`http://localhost:3000/rentals/${movieTitle}/check-out`, params)
    .then((response) => {
      console.log(response.data)
    })
    .catch(() => {
      console.log("No rental posted")
    })

    this.setState({
      selectedMovie: '',
      selectedCustomer: '',
    })

  }


  // checkout function
  // movie title
  // customer id
  // feed into axios.post url
  // params for due date
  // new Date()
  // set due date to +7
  // set due date to string for params in axios.post after url

  // onClick for checkout
  // if else to show button



  render(){
    const Home = () => {
      return (
        <h2>Home</h2>
    
      );
    }


  return (
    <div>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Movie Search</Link>
            </li>
            <li>
              <Link to="/library">Rental Library</Link>
            </li>
            <li>
              <Link to="/customers">Customer Page</Link>
            </li>
          </ul>
          <section>
            <p>Selected Movie: {this.state.selectedMovie}</p>
            <p>Selected Customer: {this.state.selectedCustomer.name}</p>
            <input
              onClick={this.checkout}
              type="submit"
              name="submit"
              value="Add Rental"
              className="add-rental"
            />
          </section>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/search">
            <MovieSearch />
          </Route>
          <Route path="/library">
            <RentalLibrary
            selectRentalCallback={this.selectRental}
            />
          </Route>
          <Route path="/customers">
            <CustomerList 
            selectCustomerCallback={this.selectCustomer}
            />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    <p>hi</p>

    </div>
  );
}
}

export default App;