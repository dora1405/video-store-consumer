import React, {Component} from 'react';
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
    const customers = this.state.allCustomers.map((oneCust) => {
      return(
      <div>
        <p>{oneCust.id}. {oneCust.name}</p>
        <ul>phone: {oneCust.phone}</ul>
        <ul>account credit: {oneCust.account_credit}</ul>
        <ul>
          <input
            onClick={()=> 
              {this.props.selectCustomerCallback(oneCust)}}
            type="submit"
            name="submit"
            value="Select Customer"
            className="customer-rental"
          />
        </ul>
      </div>
      )
    })

    return (
      <div>{customers}</div>
    )
  }
}
export default CustomerList;