import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class CustomerList extends Component {
  constructor() {
    super();

    this.state = {
      allCustomers: [],
      selectedCustomer: '',
      error: '',
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/customers')
      .then((response) => {
        this.setState({
          allCustomers: response.data
        });
      })
      .catch(() => {
        this.setState({
          error: 'nope!'
        })
      });
  }

  render () {

    console.log(this.state.allCustomers)
    const test = this.state.allCustomers.map((oneCust) => {
      return(
      <p>{oneCust.id}. {oneCust.name}, phone: {oneCust.phone}, account credit: {oneCust.account_credit}</p>
        )
    })

    return (
      <div>{test}</div>
    )
  }
}
export default CustomerList;