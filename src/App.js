import React, { Component } from 'react';
import './App.css';
import EarthquakeGarden from './EarthquakeGarden'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import UserDetails from "./UserDetails";
import AppHeader from "./AppHeader";
import axios from "axios";
import EarthquakeDetail from "./EarthquakeDetail";



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    //Function which is called whenver the component is updated
    componentDidUpdate(prevProps) {
        if (this.props.val !== prevProps.val) {
            this.getCustomerDetails(this.props.val)
        }
    }

    componentDidMount() {
        this.getheaderDetails();
    }


    getheaderDetails() {
        axios.get('http://localhost:3000/assets/samplejson/earthquake.json').then(response => {
            this.setState({headerDetails: response})
        })
    };

  render() {
      if (!this.state.headerDetails)
          return (<p>Loading Data</p>)
    console.log("Host URL"+process.env.PUBLIC_URL);
    return (
      <Router>
        <div className="App">
            <AppHeader site={this.state.headerDetails.data.site} profile={this.state.headerDetails.data.profile} ></AppHeader>
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/list"/>
                )}/>
                 <Route exact path='/list' component={EarthquakeGarden} />
              <Route exact path='/detail/:id' component={EarthquakeDetail} />
              <Route exact path='/user' component={UserDetails} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
