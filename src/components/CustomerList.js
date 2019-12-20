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

    const customers = this.state.allCustomers.map((oneCust, i) => {
      return(
      <div
        key={i}>
        <p>{oneCust.id}. {oneCust.name}</p>
        <ul>Mobil: {oneCust.phone}</ul>
        <ul>Account Credit: {oneCust.account_credit}</ul>
        <ul>Movies Checked Out: {oneCust.movie_names}</ul>

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