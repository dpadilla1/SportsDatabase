import React from 'react';
import axios from 'axios';
import '../stylesheets/TestQuery1.css';

class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null
        }
    }

    async componentDidMount() {
        this.getResults();
    }

    getResults() {
        let url = 'http://localhost:5000/api/teams';
        axios.get(url)
            .then(res => {
                this.setState({
                    results: res.data
                }, () => {
                    console.log("MY RESULTS: ", res);
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        var results = null;
        if(this.state.results != null) {
            if(this.state.results.length > 0) {
                results = this.state.results.map((r,i) => {
                    return (
                        <tr key={i}>
                            <th scope="row">{i}</th>
                            <td>{r.TEAMID}</td>
                            <td>{r.TEAMABBREVIATION}</td>
                            <td>{r.TEAMNAME}</td>
                            <td>{r.CITY}</td>
                            <td>{r.LEAGUENAME}</td>
                        </tr>
                    )
                })
            }
            else results = "No results to display.";
        }

        return (

            <div className="container">
                <br/><br/>
                <h4 className="text-center">Teams</h4>
                <div className="timesheet-table">
                    <table class="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>-</th>
                                <th>TEAMID</th>
                                <th>ABR</th>
                                <th>NAME</th>
                                <th>CITY</th>
                                <th>LEAGUE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    };
}

export default Teams;
