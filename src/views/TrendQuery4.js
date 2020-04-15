import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import '../stylesheets/TestQuery1.css';
import Navbar from "../components/navbar.component";
import CanvasJSReact from '../CanvasJS/canvasjs.react';
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TrendQuery4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
            dataPoints1: [],
            dataPoints2: [],
            dataPoints3: [],
            dataPoints4: [],
            dataPoints5: [],
            dataPoints6: [],
            dataPoints7: [],
            dataPoints8: [],
            dataPointsHide: [],
            temp1: [],
            temp2: [],
            temp3: [],
            temp4: [],
            temp5: [],
            temp6: [],
            temp7: [],
            temp8: [],
            startYear: 2015,
            endYear: 2019,
            city1: 'Los Angeles',
            city2: 'New York',
            cities: ['Anaheim','Atlanta','Baltimore','Boston','Buffalo','Calgary','Charlotte',
            'Chicago','Cincinnati','Cleveland','Columbus','Dallas','Denver','Detroit','Edmonton',
            'Green Bay','Houston','Indianapolis','Jacksonville','Kansas City','Las Vegas','Los Angeles',
            'Memphis','Miami','Milwaukee','Minneapolis','Montreal','Nashville','New Jersey','New Orleans',
            'New York','Oakland','Oklahoma City','Orlando','Ottawa','Philadelphia','Phoenix',
            'Pittsburgh','Portland','Raleigh','Sacramento','Salt Lake City','San Antonio',
            'San Diego','San Francisco','San Jose','Seattle','St. Louis','Tampa Bay','Toronto',
            'Vancouver','Washington','Winnipeg'],
            dHRs: true,
            dTDs: true,
            dBs: true,
            dGs: true
        }

        this.execute = this.execute.bind(this);
    }

    async componentDidMount() {
        this.getResults();
    }

    getResults() {
        var chart = this.chart;
        let url = 'http://localhost:5000/api/trendquery4';
        axios.get(url, {params: {
                startYear: this.state.startYear,
                endYear: this.state.endYear,
                city1: this.state.city1,
                city2: this.state.city2
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
                    let w = [];
                    let x = [];
                    let y = [];
                    let z = [];
                    for(var i=0; i < res.data.length; i++) {
                        if(res.data[i].AREANAME === this.state.city1) {
                            if(res.data[i].HOMERUNS !== null) {
                                a.push({
                                    y: res.data[i].HOMERUNS,
                                    x: res.data[i].YEAR
                                })
                            }
                            if(res.data[i].TOUCHDOWNS !== null) {
                                b.push({
                                    y: res.data[i].TOUCHDOWNS,
                                    x: res.data[i].YEAR
                                })
                            }
                            if(res.data[i].BASKETS !== null) {
                                c.push({
                                    y: res.data[i].BASKETS,
                                    x: res.data[i].YEAR
                                })
                            }
                            if(res.data[i].GOALS !== null) {
                                d.push({
                                    y: res.data[i].GOALS,
                                    x: res.data[i].YEAR
                                })
                            }
                        }
                        if(res.data[i].AREANAME === this.state.city2) {
                            if(res.data[i].HOMERUNS !== null) {
                                w.push({
                                    y: res.data[i].HOMERUNS,
                                    x: res.data[i].YEAR
                                })
                            }
                            if(res.data[i].TOUCHDOWNS !== null) {
                                x.push({
                                    y: res.data[i].TOUCHDOWNS,
                                    x: res.data[i].YEAR
                                })
                            }
                            if(res.data[i].BASKETS !== null) {
                                y.push({
                                    y: res.data[i].BASKETS,
                                    x: res.data[i].YEAR
                                })
                            }
                            if(res.data[i].GOALS !== null) {
                                z.push({
                                    y: res.data[i].GOALS,
                                    x: res.data[i].YEAR
                                })
                            }
                        }
                    }
                    this.setState({
                        dataPoints1: a,
                        dataPoints2: b,
                        dataPoints3: c,
                        dataPoints4: d,
                        dataPoints5: w,
                        dataPoints6: x,
                        dataPoints7: y,
                        dataPoints8: z,
                        temp1: a,
                        temp2: b,
                        temp3: c,
                        temp4: d,
                        temp5: w,
                        temp6: x,
                        temp7: y,
                        temp8: z,
                    })
                    chart.render();
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    setStartYear() {
        this.setState({
            startYear: this.refs.startYearSelect.value
        })
    }

    setEndYear() {
        this.setState({
            endYear: this.refs.endYearSelect.value
        })
    }

    setCity1() {
        this.setState({
            city1: this.refs.city1.value
        })
    }
    setCity2() {
        this.setState({
            city2: this.refs.city2.value
        })
    }

    execute() {
        if(this.refs.startYearSelect.value > this.refs.endYearSelect.value) this.yearError();
        else this.getResults();
    }

    showHRs() {
        if(this.state.dHRs === true) {
            this.setState({
                dHRs: false,
                temp1: this.state.dataPointsEmpty,
                temp5: this.state.dataPointsEmpty
            })
        }
        else {
            this.setState({
                dHRs: true,
                temp1: this.state.dataPoints1,
                temp5: this.state.dataPoints5
            })
        }
    }

    showTDs() {
        if(this.state.dTDs === true) {
            this.setState({
                dTDs: false,
                temp2: this.state.dataPointsEmpty,
                temp6: this.state.dataPointsEmpty
            })
        }
        else {
            this.setState({
                dTDs: true,
                temp2: this.state.dataPoints2,
                temp6: this.state.dataPoints6
            })
        }
    }

    showBs() {
        if(this.state.dBs === true) {
            this.setState({
                dBs: false,
                temp3: this.state.dataPointsEmpty,
                temp7: this.state.dataPointsEmpty
            })
        }
        else {
            this.setState({
                dBs: true,
                temp3: this.state.dataPoints3,
                temp7: this.state.dataPoints7
            })
        }
    }

    showGs() {
        if(this.state.dGs === true) {
            this.setState({
                dGs: false,
                temp4: this.state.dataPointsEmpty,
                temp8: this.state.dataPointsEmpty
            })
        }
        else {
            this.setState({
                dGs: true,
                temp4: this.state.dataPoints4,
                temp8: this.state.dataPoints8
            })
        }
    }

    yearError() {
        alert("Invalid year range.");
    }

    render() {
        //Chart Options
        const options = {
            animationEnabled: true,	
            title:{
                text: "Scoring Counts per game of 2 selected cities."
            },
            legend: {
                horizontalAlign: "right",
                verticalAlign: "center"
            },
            axisX: {
                valueFormatString: "####",
                interval: 1
            },
            axisY : [{
                title: "HOMERUNSs",
                titleFontColor: "#4F81BC",
				lineColor: "#4F81BC",
				labelFontColor: "#4F81BC",
				tickColor: "#4F81BC",
                includeZero: false
            }, {
                title:"TOUCHDOWNS",
                titleFontColor: "#9BBB58",
				lineColor: "#9BBB58",
				labelFontColor: "#9BBB58",
				tickColor: "#9BBB58",
                includeZero: false
            }],
            axisY2 : [{
                title: "BASKETS",
                titleFontColor: "#C0504E",
				lineColor: "#C0504E",
				labelFontColor: "#C0504E",
				tickColor: "#C0504E",
                includeZero: false
            }, {
                title:"GOALS",
                titleFontColor: "#23BFAA",
				lineColor: "#23BFAA",
				labelFontColor: "#23BFAA",
				tickColor: "#23BFAA",
                includeZero: false
            }],
            toolTip: {
                shared: true
            },
            data: [{
                type: "line",
                name: "City 1 HRs",
                color: "#183163",
                showInLegend: true,
                dataPoints: this.state.temp1
            },
            {
                type: "line",
                name: "City 2 HRs",
                color: "#9EB3C6",
                showInLegend: true,
                dataPoints: this.state.temp5
            },
            {
                type: "line",
                name: "City 1 TDs",
                color: "#067E07",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints: this.state.temp2
            },
            {
                type: "line",
                name: "City 2 TDs",
                color: "#90BE91",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints: this.state.temp6
            },
            {
                type: "column",
                name: "City 1 Baskets",
                color: "#9B0000",
                axisYIndex: 1,
                showInLegend: true,
                dataPoints: this.state.temp3
            },
            {
                type: "column",
                name: "City 2 Baskets",
                color: "#FFACAC",
                axisYIndex: 1,
                showInLegend: true,
                dataPoints: this.state.temp7
            },
            {
                type: "column",
                name: "City 1 Goals",
                color: "#23BFAA",
                axisYType: "secondary",
                axisYIndex: 1,
                showInLegend: true,
                dataPoints: this.state.temp4
            },
            {
                type: "column",
                name: "City 2 Goals",
                color: "#ACFFF8",
                axisYType: "secondary",
                axisYIndex: 2,
                showInLegend: true,
                dataPoints: this.state.temp8
            },]
        }


        //Table Entries
        var results = null;
        if(this.state.results != null) {
            if(this.state.results.length > 0) {
                results = this.state.results.map((r,i) => {
                    return (
                        <tr key={i}>
                            <th scope="row">{i}</th>
                            <td>{r.YEAR}</td>
                            <td>{r.AREANAME}</td>
                            <td>{r.HOMERUNS}</td>
                            <td>{r.TOUCHDOWNS}</td>
                            <td>{r.BASKETS}</td>
                            <td>{r.GOALS}</td>
                        </tr>
                    )
                })
            }
            else results = "No results to display.";
        }

        return (

            <div>
            <Navbar /><br />
            <div className="container">
            <h5 className="text-center">Trend Query 4</h5>
            <p className="text-center">This page displays counts of the major offensive scoring
                                        categories from the 4 major sports leagues of 2 selected
                                        cities for comparison. This can be seen as a sort of 
                                        excitement rating, and how entertaining sports can be 
                                        in different cities.</p>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <h6>Start Year</h6>
                        <select className="form-control selectYear" ref="startYearSelect"
                                    onChange={this.setStartYear.bind(this)} defaultValue={2015}>
                                { _.range(2004,2019).reverse().map(y => 
                                    <option key={y} value={y}>{y}</option>
                                )}
                        </select>
                    </div>
                    <div className="col-2">
                        <h6>End Year</h6>
                        <select className="form-control selectYear" ref="endYearSelect"
                                    onChange={this.setEndYear.bind(this)} >
                                { _.range(2004,2020).reverse().map(y => 
                                    <option key={y} value={y}>{y}</option>
                                )}
                        </select>
                    </div>
                    <div className="col-2">
                        <h6>City 1</h6>
                        <select className="form-control playerType" ref="city1"
                                    onChange={this.setCity1.bind(this)} defaultValue={'Los Angeles'}>
                                {this.state.cities.map(m =>
                                    <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="col-2">
                        <h6>City 2</h6>
                        <select className="form-control playerType" ref="city2"
                                    onChange={this.setCity2.bind(this)} defaultValue={'New York'}>
                                {this.state.cities.map(m =>
                                    <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col text-center">
                    <button type="button" onClick={this.execute}
                        className="btn btn-primary">Execute</button>
                </div></div>
                <br/><br />

                <div className="row justify-content-center">
                    <div className="col-2 text-center">
                        <label className="checkbox">
                            <input
                                name="HRs"
                                type="checkbox"
                                onChange={this.showHRs.bind(this)}
                                defaultChecked={this.state.dHRs}
                            />
                            {"Home Runs"}
                        </label>
                    </div>
                    <div className="col-2 text-center">
                        <label className="checkbox">
                            <input
                                name="TDs"
                                type="checkbox"
                                onChange={this.showTDs.bind(this)}
                                defaultChecked={this.state.dTDs}
                            />
                            {"Touchdowns"}
                        </label>
                    </div>
                    <div className="col-2 text-center">
                        <label className="checkbox">
                            <input
                                name="Baskets"
                                type="checkbox"
                                onChange={this.showBs.bind(this)}
                                defaultChecked={this.state.dBs}
                            />
                            {"Baskets"}
                        </label>
                    </div>
                    <div className="col-2 text-center">
                        <label className="checkbox">
                            <input
                                name="Goals"
                                type="checkbox"
                                onChange={this.showGs.bind(this)}
                                defaultChecked={this.state.dGs}
                            />
                            {"Goals"}
                        </label>
                    </div>
                </div>
                
                <div>
                    <CanvasJSChart options = {options} 
				        onRef={ref => this.chart = ref}
			        />
			        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		        </div><br /><br/><br/><br/><br/><br/><br/><br/><br/><br/>

                {/*<h4 className="text-center">Teams</h4>*/}
                <div className="timesheet-table">
                    <h5 className="text-center">Displaying results for TrendQuery4:</h5>
                    
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>-</th>
                                <th>Year</th>
                                <th>City</th>
                                <th>HRs</th>
                                <th>TDs</th>
                                <th>Baskets</th>
                                <th>Goals</th>
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

export default TrendQuery4;
