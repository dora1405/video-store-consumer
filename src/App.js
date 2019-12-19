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
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCustomer: undefined,
      selectedMovie: undefined,
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
      selectedCustomer: customer.name
    })
      
  }

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
          <p>Selected Movie: {this.state.selectedMovie}</p>
          <p>Selected Customer: {this.state.selectedCustomer}</p>

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