import React from 'react';
import axios from 'axios';
import '../stylesheets/TestQuery1.css';
import CanvasJSReact from '../CanvasJS/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TrendQuery3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
            dataPoints1: [{tType: 'loading'}],
            dataPoints2: [{tType: 'loading'}],
            dataPoints3: [{tType: 'loading'}]
        }
    }

    async componentDidMount() {
        this.getResults();
    }

    getResults() {
        var chart = this.chart;
        let url = 'http://localhost:5000/api/trendquery3';
        axios.get(url)
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
                    for(var i=0; i< (res.data.length / 3); i++) {
                        a.push({
                            y: res.data[i].C,
                            label: res.data[i].MONTH,
                            tType: res.data[i].TURNOVERTYPE
                        })
                    }
                    for(var j= (res.data.length / 3); j< (res.data.length / 3 * 2); j++) {
                        b.push({
                            y: res.data[j].C,
                            label: res.data[j].MONTH,
                            tType: res.data[j].TURNOVERTYPE
                        })
                    }
                    for(var k= (res.data.length / 3 * 2); k< res.data.length; k++) {
                        c.push({
                            y: res.data[k].C,
                            label: res.data[k].MONTH,
                            tType: res.data[k].TURNOVERTYPE
                        })
                    }
                    this.setState({
                        dataPoints1: a,
                        dataPoints2: b,
                        dataPoints3: c
                    });
                    chart.render();
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        //Chart Options
        const options = {
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Amount of Top 3 Causes of Turnovers in NBA per Month"
			},
			axisY: {
				title: "Count"
			},
			toolTip: {
				shared: true,
				reversed: true
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
			},
			data: [
			{
				type: "column",
				name: this.state.dataPoints1[0].tType,
				showInLegend: true,
				dataPoints: this.state.dataPoints1
			},
			{
				type: "column",
				name: this.state.dataPoints2[0].tType,
				showInLegend: true,
				dataPoints: this.state.dataPoints2
			},
			{
				type: "column",
				name: this.state.dataPoints3[0].tType,
				showInLegend: true,
				dataPoints: this.state.dataPoints3
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
                            <td>{r.MONTH}</td>
                            <td>{r.TURNOVERTYPE}</td>
                            <td>{r.C}</td>
                        </tr>
                    )
                })
            }
            else results = "No results to display.";
        }

        return (

            <div className="container">
                <div>
                    <CanvasJSChart options = {options} 
				        onRef={ref => this.chart = ref}
			        />
			        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		        </div><br /><br/>

                {/*<h4 className="text-center">Teams</h4>*/}
                <div className="timesheet-table">
                    <h5 className="text-center">Displaying results for Trend Query 3</h5>
                    
                    <table class="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>-</th>
                                <th>Month</th>
                                <th>Turnover Type</th>
                                <th>Count</th>
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

export default TrendQuery3;
