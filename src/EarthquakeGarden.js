import React, {Component} from 'react';
import axios from 'axios'
import EarthquakeList from './EarthquakeList'

export default class EarthquakeGarden extends Component {


  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getSourceData();
  }

  getSourceData() {
    axios.get('http://localhost:3000/assets/samplejson/earthquake.json').then(response => {
      this.setEarthquakeList(response.data.data);
      this.setState({loading: false});
    })
  };

  setEarthquakeList(response) {
    this.setState({data: response}); 
  }
  

  render() {
    if(this.state.loading)
      return (<p>Loading data....</p>);
    return (
      <div>
      <EarthquakeList data={this.state.data}></EarthquakeList>
    </div>)
  }

}
