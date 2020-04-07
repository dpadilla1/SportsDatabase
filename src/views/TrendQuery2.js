import React from 'react';
import axios from 'axios';
import '../stylesheets/TestQuery1.css';
import CanvasJSReact from '../CanvasJS/canvasjs.react';
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints1=[];
var dataPoints2=[];

class TrendQuery2 extends React.Component {
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
        var chart = this.chart;
        dataPoints1 = [];
        dataPoints2 = [];
        let url = 'http://localhost:5000/api/trendquery2';
        axios.get(url)
            .then(res => {
                this.setState({
                    results: res.data
                }, () => {
                    //display data for testing
                    console.log("MY RESULTS: ", res);
                    //insert data into datapoints for chart
                    for(var i=0; i< (res.data.length / 2); i++) {
                        dataPoints1.push({
                            y: res.data[i].TOTALYARDS,
                            label: res.data[i].SEASONYEAR
                        })
                    }
                    for(var j= (res.data.length / 2); j< res.data.length; j++) {
                        dataPoints2.push({
                            y: res.data[j].TOTALYARDS,
                            label: res.data[j].seasonyear
                        })
                    }
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
            title:{
                text: "Total Rushing/Passing Yards in NFL"
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
                /*dataPoints: [
                    { y: 155, label: "2015" },
                    { y: 150, label: "2016" },
                    { y: 152, label: "2017" },
                    { y: 148, label: "2018" },
                    { y: 142, label: "2019" },
                ]*/
                dataPoints: dataPoints1
            },
            {
                type: "line",
                name: "PASS",
                axisYType: "secondary",
                showInLegend: true,
                /*dataPoints: [
                    { y: 172, label: "2015" },
                    { y: 173, label: "2016" },
                    { y: 175, label: "2017" },
                    { y: 172, label: "2018" },
                    { y: 162, label: "2019" },
                ]*/
                dataPoints: dataPoints2
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
                            <td>{r.TOTALYARDS}</td>
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
                    <h5 className="text-center">Displaying results for Trend Query 2:</h5>
                    {/*<div style={{"display": "inline-block", "text-align": "center"}}>*/}
                    <h5>'SELECT seasonYear, playType, SUM(Yards) as totalYards</h5>
                    <h5>FROM NFL_PLAYBYPLAY npbp, gamestats, game</h5>
                    <h5>WHERE npbp.gamestatsid = gamestats.gamestatsid</h5>
                    <h5>&emsp;AND gamestats.gameid = game.gameid</h5>
                    <h5>GROUP BY seasonYear, playType</h5>
                    <h5>HAVING playType='RUSH' OR playType='PASS'</h5>
                    <h5>ORDER BY playType ASC, seasonyear'</h5>
                    
                    <table class="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>-</th>
                                <th>Year</th>
                                <th>Play Type</th>
                                <th>Total Yards</th>
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

export default TrendQuery2;
