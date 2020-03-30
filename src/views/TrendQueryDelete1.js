import React from 'react';
import axios from 'axios';
import '../stylesheets/TestQuery1.css';
import YearSlider from '../components/yearslider.component';
import CanvasJSReact from '../CanvasJS/canvasjs.react';
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TrendQuery1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
            dataPoints1: [],
            dataPoints2: [],
            startYear: 2015,
            endYear: 2019
        }

        this.execute = this.execute.bind(this);
    }

    async componentDidMount() {
        this.getResults();
    }

    getResults() {
        var chart = this.chart;
        let url = 'http://localhost:5000/api/trendquery1';
        axios.get(url, {params: {
                startYear: this.state.startYear,
                endYear: this.state.endYear
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
                    for(var i=0; i< (res.data.length / 2); i++) {
                        a.push({
                            y: res.data[i].AVERAGEYARDS,
                            label: res.data[i].SEASONYEAR
                        })
                    }
                    for(var j= (res.data.length / 2); j< res.data.length; j++) {
                        b.push({
                            y: res.data[j].AVERAGEYARDS,
                            label: res.data[j].seasonyear
                        })
                    }
                    this.setState({
                        dataPoints1: a,
                        dataPoints2: b 
                    })
                    chart.render();
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    setYears(year_range) {
        this.setState({
            startYear: year_range[0],
            endYear: year_range[1]
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
                text: "Average Rushing/Passing Yards in NFL"
            },
            axisY : {
                title: "Passing Yards",
                titleFontColor: "blue",
				lineColor: "blue",
				labelFontColor: "blue",
				tickColor: "blue",
                includeZero: false
            },
            axisY2 : {
                title: "Rushing Yards",
                titleFontColor: "red",
				lineColor: "red",
				labelFontColor: "red",
				tickColor: "red",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "line",
                name: "RUSH",
                showInLegend: true,
                dataPoints: this.state.dataPoints1
            },
            {
                type: "line",
                name: "PASS",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints: this.state.dataPoints2
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
                            <td>{r.SEASONYEAR}</td>
                            <td>{r.PLAYTYPE}</td>
                            <td>{r.AVERAGEYARDS}</td>
                        </tr>
                    )
                })
            }
            else results = "No results to display.";
        }

        return (

            <div className="container">
                <YearSlider setYears = {this.setYears.bind(this)} />
                <button type="button" onClick={this.execute}
                    class="btn btn-primary">Execute</button>
                <br/><br />
                
                <div>
                    <CanvasJSChart options = {options} 
				        onRef={ref => this.chart = ref}
			        />
			        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		        </div><br /><br/>

                {/*<h4 className="text-center">Teams</h4>*/}
                <div className="timesheet-table">
                    <h5 className="text-center">Displaying results for TrendQuery1:</h5>
                    
                    <table class="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>-</th>
                                <th>Year</th>
                                <th>Play Type</th>
                                <th>Average Yards</th>
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

export default TrendQuery1;
