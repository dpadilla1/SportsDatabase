import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import '../stylesheets/TestQuery1.css';
import FantasyNavbar from "../components/fantasynavbar.component";
import CanvasJSReact from '../CanvasJS/canvasjs.react';
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class FantasyQuery1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
            dataPoints1: [],
            seasonYear: 2015,
            playerType: 'Passer',
            scoringType: 'Standard',
            quantity: 15
        }

        this.execute = this.execute.bind(this);
    }

    async componentDidMount() {
        this.getResults();
    }

    getResults() {
        var chart = this.chart;
        let url = 'http://localhost:5000/api/fantasyquery1';
        axios.get(url, {params: {
                seasonYear: this.state.seasonYear,
                playerType: this.state.playerType,
                scoringType: this.state.scoringType,
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
                    for(var x=0; x < res.data.length; x++) {
                        a.push({
                            y: res.data[x].FANTASYPOINTS,
                        label: res.data[x].NAME
                        })
                    }

                    this.setState({
                        dataPoints1: a
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

    setType() {
        this.setState({
            playerType: this.refs.typeSelect.value
        })
    }

    setScoringType() {
        this.setState({
            scoringType: this.refs.scoringtypeSelect.value
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
                text: "Top Fantasy Players in NFL"
            },
            axisX: {
                interval: 1,
                reversed: true
            },
            axisY : {
                title: "Fantasy Points",
                //titleFontColor: "blue",
				//lineColor: "blue",
				//labelFontColor: "blue",
				//tickColor: "blue",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "bar",
                dataPoints: this.state.dataPoints1
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
                            <td>{r.YEAR}</td>
                            <td>{r.NAME}</td>
                            <td>{r.FANTASYPOINTS}</td>
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
                <h5 className="text-center">Fantasy Query 1</h5>
                <p className="text-center">This page displays the total fantasy points of the 
                                            top fantasy players in the NFL by a selected year,
                                            player type, scoring type. This can provide valuable
                                            information on the rate at which value diminishes by 
                                            player position and scoring type.</p>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <h6>Season Year</h6>
                        <select className="form-control selectYear" ref="yearSelect"
                                    onChange={this.setYear.bind(this)} >
                                { _.range(1960,2017).reverse().map(y => 
                                    <option key={y} value={y}>{y}</option>
                                )}
                        </select>
                    </div>
                    <div className="col-2">
                        <h6>Player Type</h6>
                        <select className="form-control playerType" ref="typeSelect"
                                    onChange={this.setType.bind(this)} >
                                <option key={'pa'} value={'Passer'}>QB</option>
                                <option key={'ru'} value={'Rusher'}>RUSHER</option>
                                <option key={'re'} value={'Receiver'}>RECEIVER</option>
                        </select>
                    </div>
                    <div className="col-2">
                        <h6>Scoring Type</h6>
                        <select className="form-control playerType" ref="scoringtypeSelect"
                                    onChange={this.setScoringType.bind(this)} >
                                <option key={'st'} value={'Standard'}>STANDARD</option>
                                <option key={'half'} value={'Half PPR'}>HALF-PPR</option>
                                <option key={'ppr'} value={'PPR'}>PPR</option>
                        </select>
                    </div>
                    <div className="col-2">
                        <h6># of Players</h6>
                        <select className="form-control playerType" ref="quantitySelect"
                                    onChange={this.setQuantity.bind(this)} >
                                { _.range(2,16).reverse().map(y => 
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
                {/*<div className="timesheet-table">
                    <h5 className="text-center">Displaying results for Fantasy Query 1:</h5>
                    
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>-</th>
                                <th>Year</th>
                                <th>Name</th>
                                <th>Fantasy Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results}
                        </tbody>
                    </table>
                </div>*/}
            </div>
            </div>
        )
    };
}

export default FantasyQuery1;
