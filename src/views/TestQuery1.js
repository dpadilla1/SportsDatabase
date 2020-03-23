import React from 'react';
import axios from 'axios';
import '../stylesheets/TestQuery1.css';

class TestQuery1 extends React.Component {
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
        let url = 'http://localhost:5000/api/queryTest';
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
                            <td>{r.NAME}</td>
                            <td>{r.COUNTRY}</td>
                        </tr>
                    )
                })
            }
            else results = "No results to display.";
        }

        return (

            <div className="container">
                <h4 className="text-center">Test Query 1</h4>
                <div className="timesheet-table">
                    <h5 className="text-center">Results</h5>
                    <table class="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Key</th>
                                <th>Name</th>
                                <th>Country</th>
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

export default TestQuery1;
