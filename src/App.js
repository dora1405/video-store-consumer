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
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import './App.css'


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
    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate()+7);
    let params = {
      customer_id: this.state.selectedCustomer.id,
      due_date: dueDate.toString()
    }

    axios.post(`http://localhost:3000/rentals/${movieTitle}/check-out`, params)
    .catch(() => {
      console.log("No rental posted")
    })

    this.setState({
      selectedMovie: '',
      selectedCustomer: '',
    })

  }


  render(){
    let rentalButton;
    if (this.state.selectedCustomer && this.state.selectedMovie) {
      rentalButton = <input
      onClick={this.checkout}
      type="submit"
      name="submit"
      value="Add Rental"
      className="add-rental"
    />
    } else {
      rentalButton = "Select one movie and one customer to make a rental"
    }

    const Home = () => {
      return (
        <section className="home-page">
          <section className='header'>
          <h2 className='title'>Welcome to BlockRuster</h2>
          <p>Zombie Apocalypse happened?</p>
          <p>Netflix, Hulu, Amazon Prime defunct?</p>
          <p>Are we your last resort?</p>
          <p className='title'>Good new! We're still here for you!</p>
          </section>
          <section className="home-body">
          <p>Selected Movie: {this.state.selectedMovie}</p>
          <p>Selected Customer: {this.state.selectedCustomer.name}</p>
          {rentalButton}
          </section>
        </section>
        
    
      );
    }


  return (
    <div>
    <Router>
    <Navbar>
      <div>
        <nav>
          <ul className="nav-list">
            <li>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li>
              <Link className="nav-link" to="/search">Movie Search</Link>
            </li>
            <li>
              <Link className="nav-link" to="/library">Rental Library</Link>
            </li>
            <li>
              <Link className="nav-link" to="/customers">Customer Page</Link>
            </li>
          </ul>
          <section>
            <p>Selected Movie: {this.state.selectedMovie}</p>
            <p>Selected Customer: {this.state.selectedCustomer.name}</p>
          </section>
        </nav>
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
      </Navbar>
    </Router>

    </div>
  );
}
}

export default App;