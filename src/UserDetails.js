import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import axios from 'axios'

//This Component is a child Component of Customers Component
export default class UserDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  //Function which is called when the component loads for the first time
  componentDidMount() {
    this.getCustomerDetails(this.props.val)
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {

    //get Customer Details only if props has changed
    if (this.props.val !== prevProps.val) {
      this.getCustomerDetails(this.props.val)
    }
  }

  //Function to Load the customerdetails data from json.
  getCustomerDetails(id) {
    axios.get('assets/samplejson/earthquake.json').then(response => {
      this.setState({customerDetails: response.data.profile})
    })
  };

  render() {
    if (!this.state.customerDetails)
      return (<p>Loading Data</p>)
    return (<div className="earthquake-detail row">
        <div className="header-text">
            Profile
        </div>
        <div className = "userContainer col-xs-12">
            <div className="col-xs-2"></div>
          <div className="user-logo col-xs-2">
        <img  src={this.state.customerDetails.avatarImage} className="avatar" alt="logo" />
          </div>
         <div className="user-information col-xs-1.5">
           <p>First Name</p>
           <p>Last Name</p>
             <p>Phone </p>
             <p>Email </p>
             <p>Bio </p>
         </div>
            <div className="user-additional-info col-xs-3">
                <p>{this.state.customerDetails.firstName}</p>
            <p>{this.state.customerDetails.lastName}</p>
            <p>{this.state.customerDetails.phone}</p>
             <p>{this.state.customerDetails.email}</p>
            <p>{this.state.customerDetails.bio}</p>
            </div>
        </div>
    </div>)
  }
}
