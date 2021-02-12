import React, {Component} from 'react';
import axios from 'axios'

export default class EarthquakeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        }
    }

    //Function which is called when the component loads for the first time
    componentDidMount() {
       this.getDetails()
    }

    getDetails() {
        axios.get('http://localhost:3000/assets/samplejson/earthquake.json').then(response => {
            const feature = response.data.data.features.find(feature => feature.id === this.state.id);
            this.setState({feature:feature});
            console.log(this.state.feature);
        })
    };

    render() {
        if(!this.state.feature){
            return (<p>Loading Data .....</p>)
        }
        return (<div className="earthquake-detail row">
            <div className="header-text">
                {this.state.feature.properties.title}
            </div>
            <div className = "userContainer col-xs-12">
                <div className="col-xs-4"></div>
                <div className="user-information col-xs-1.5">
                    <p>Title </p>
                    <p>Magnitude </p>
                    <p>Time </p>
                    <p>Status </p>
                    <p>Tsunami </p>
                    <p>Type </p>
                </div>
                <div className="user-additional-info col-xs-3">
                    <p>{this.state.feature.properties.title}</p>
                    <p>{this.state.feature.properties.mag}</p>
                    <p>{this.state.feature.properties.time}</p>
                    <p>{this.state.feature.properties.status}</p>
                    <p>{this.state.feature.properties.tsunami}</p>
                    <p>{this.state.feature.properties.type}</p>
                </div>
            </div>
        </div>)
    }
}
