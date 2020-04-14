import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import '../stylesheets/TestQuery1.css';
import FantasyNavbar from "../components/fantasynavbar.component";
import CanvasJSReact from '../CanvasJS/canvasjs.react';
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class FantasyQuery2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
            dataPoints1: [],
            dataPoints2: [],
            dataPoints3: [],
            dataPoints4: [],
            seasonYear: 2016,
            quantity: '15'
        }

        this.execute = this.execute.bind(this);
    }

    async componentDidMount() {
        this.getResults();
    }

    getResults() {
        var chart = this.chart;
        let url = 'http://localhost:5000/api/fantasyquery2';
        axios.get(url, {params: {
                seasonYear: this.state.seasonYear,
                quantity: this.state.quantity
            }})
            .then(res => {
                this.setState({
                    results: res.data
                }, () => {
                    //display data for testing
                    console.log("MY RESULTS: ", res);
                    //insert data into datapoints for chart
                    let a = [];
                    let b = [];
                    let c = [];
                    let d = [];
                    for(var x=0; x < res.data.length; x++) {
                        if(res.data[x].LEAGUE === 'NFL') {
                            a.push({
                                x: 0,
                                y: [res.data[x].MINIMUM,
                                    res.data[x].Q1,
                                    res.data[x].Q3,
                                    res.data[x].MAXIMUM,
                                    res.data[x].Q2],
                                label: "NFL"
                            })
                        }
                        if(res.data[x].LEAGUE === 'MLB') {
                            b.push({
                                x: 1,
                                y: [res.data[x].MINIMUM,
                                res.data[x].Q1,
                                res.data[x].Q3,
                                res.data[x].MAXIMUM,
                                res.data[x].Q2],
                                label: "MLB"
                            })
                        }
                        if(res.data[x].LEAGUE === 'NHL') {
                            c.push({
                                x: 2,
                                y: [res.data[x].MINIMUM,
                                res.data[x].Q1,
                                res.data[x].Q3,
                                res.data[x].MAXIMUM,
                                res.data[x].Q2],
                                label: "NHL"
                            })
                        }
                        if(res.data[x].LEAGUE === 'NBA') {
                            d.push({
                                x: 3,
                                y: [res.data[x].MINIMUM,
                                res.data[x].Q1,
                                res.data[x].Q3,
                                res.data[x].MAXIMUM,
                                res.data[x].Q2],
                                label: "NBA"
                            })
                        }
                    }
                    this.setState({
                        dataPoints1: a,
                        dataPoints2: b,
                        dataPoints3: c,
                        dataPoints4: d
                    })
                    chart.render();
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    setYear() {
        this.setState({
            seasonYear: this.refs.yearSelect.value
        })
    }

    setQuantity() {
        this.setState({
            quantity: this.refs.quantitySelect.value
        })
    }

    execute() {
        this.getResults();
    }

    render() {
        //Chart Options
        const options = {
            animationEnabled: true,	
            title:{
                text: "Rank-Value Analysis Across Sports Leagues"
            },
            axisX: {
                interval: 1
            },
            axisY : [{
                title: " ",
                //titleFontColor: "blue",
				lineColor: "#4F81BC",
				labelFontColor: "#4F81BC",
				tickColor: "#4F81BC",
                includeZero: false
            }, {
                title:"Fantasy Points",
                //titleFontColor: "#9BBB58",
				lineColor: "#9BBB58",
				labelFontColor: "#9BBB58",
				tickColor: "#9BBB58",
                includeZero: false
            }],
            axisY2 : [{
                title: " ",
                titleFontColor: "#C0504E",
				lineColor: "#C0504E",
				labelFontColor: "#C0504E",
				tickColor: "#C0504E",
                includeZero: false
            }, {
                title:"Fantasy Points",
                //titleFontColor: "#23BFAA",
				lineColor: "#23BFAA",
				labelFontColor: "#23BFAA",
				tickColor: "#23BFAA",
                includeZero: false
            }],
            data: [{
                type: "boxAndWhisker",
                dataPoints: this.state.dataPoints1,
                name: "NFL",
                showInLegend: true
            },
            {
                type: "boxAndWhisker",
                axisYType: "secondary",
                dataPoints: this.state.dataPoints3,
                name: "NHL",
                showInLegend: true
            },
            {
                type: "boxAndWhisker",
                axisYIndex: 1,
                dataPoints: this.state.dataPoints2,
                name: "MLB",
                showInLegend: true
            },
            {
                type: "boxAndWhisker",
                axisYIndex: 1,
                axisYType: "secondary",
                dataPoints: this.state.dataPoints4,
                name: "NBA",
                showInLegend: true
            }]
        }


        //Table Entries
        var results = null;
        if(this.state.results != null) {
            if(this.state.results.length > 0) {
                results = this.state.results.map((r,i) => {
                    return (
                        <tr key={i}>
                            <th scope="row">{i}</th>
                            <td>{r.LEAGUE}</td>
                            <td>{r.YEAR}</td>
                            <td>{r.MINIMUM}</td>
                            <td>{r.Q1}</td>
                            <td>{r.Q2}</td>
                            <td>{r.Q3}</td>
                            <td>{r.MAXIMUM}</td>
                        </tr>
                    )
                })
            }
            else results = "No results to display.";
        }

        return (

            <div>
            <FantasyNavbar /><br />
            <div className="container">
            <h5 className="text-center">Fantasy Query 2</h5>
            <p className="text-center">This page displays the 5-number summary of the fantasy points
                                        of a selected number of top players of sports leagues by year.
                                        The graphic allows for the comparison of how value falls off 
                                        as rank decreases. This provides information that can be helpful
                                        in determining optimal draft strategies based on the type of
                                        fantasy league that is being played. </p>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <h6>Season Year</h6>
                        <select className="form-control selectYear" ref="yearSelect"
                                    onChange={this.setYear.bind(this)} >
                                { _.range(1960,2019).reverse().map(y => 
                                    <option key={y} value={y}>{y}</option>
                                )}
                        </select>
                    </div>
                    <div className="col-2">
                        <h6># of Players</h6>
                        <select className="form-control playerType" ref="quantitySelect"
                                    onChange={this.setQuantity.bind(this)} >
                                { _.range(5,16).reverse().map(y => 
                                    <option key={y} value={y}>{y}</option>
                                )}
                        </select>
                    </div>
                </div><br/>
                
                <div className="row">
                    <div className="col text-center">
                    <button type="button" onClick={this.execute}
                        className="btn btn-primary">Execute</button>
                </div></div>
                <br/><br />
                
                <div>
                    <CanvasJSChart options = {options} 
				        onRef={ref => this.chart = ref}
			        />
			        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		        </div><br /><br/><br/><br/><br/><br/><br/>

                {/*<h4 className="text-center">Teams</h4>*/}
                <div className="timesheet-table">
                    <h5 className="text-center">Displaying results for TrendQuery1:</h5>
                    
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>-</th>
                                <th>League</th>
                                <th>Year</th>
                                <th>MINIMUM</th>
                                <th>Q1</th>
                                <th>Q2</th>
                                <th>Q3</th>
                                <th>MAXIMUM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        )
    };
}

export default FantasyQuery2;
