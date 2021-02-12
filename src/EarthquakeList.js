import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class EarthquakeList extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);

        this.state = {
            data : this.props.data.features,
            title : this.props.data.metadata.title,
            sortFlags: {
                place:false,
                mag: false,
                time: false
            }
        };
        this.compareBy.bind(this);
        this.sortBy.bind(this);
        this.compareByDesc.bind(this);
      }


    compareBy(key) {
        return function (a, b) {
            if (a.properties[key] < b.properties[key]) return -1;
            if (a.properties[key] > b.properties[key]) return 1;
            return 0;
        };
    }

    compareByDesc(key) {
        return function (a, b) {
            if (a.properties[key] < b.properties[key]) return 1;
            if (a.properties[key] > b.properties[key]) return -1;
            return 0;
        };
    }

    sortBy(key) {
        const flags = {...this.sortFlags};
        flags[key] = !flags[key];
        this.setState({sortFlags:flags});
        let arrayCopy = [...this.state.data];
        arrayCopy.sort( this.state.sortFlags[key] ? this.compareBy(key): this.compareByDesc(key));
        this.setState({data: arrayCopy});
    }


    render() {
        if(!this.state.data){
            return (<p>Loading Data .....</p>)
        }

        return (

            <div class="container">
                <p className="list-header">{this.state.title}</p>
                <table class="table">
                    <thead>
                    <tr>
                        <th className="table-header" onClick={() => this.sortBy('place')}>
                            Title
                        </th>
                        <th className="table-header" onClick={() => this.sortBy('mag')}>
                            Magnitude
                        </th>
                        <th className="table-header" onClick={() => this.sortBy('time')}>
                            Time
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.data.map(data => {
                        return( <tr>
                            <td>
                                <li>
                                    <Link to={`/detail/${data.id}/`}>{data.properties.place}</Link>
                                </li>

                            </td>
                            <td>
                               {data.properties.mag}
                            </td>
                            <td>
                                {new Date(data.properties.time).toString()}
                            </td>
                            </tr>)
                    })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
