import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import '../stylesheets/TestQuery1.css';
import FantasyNavbar from "../components/fantasynavbar.component";
import CanvasJSReact from '../CanvasJS/canvasjs.react';
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class FantasyQuery3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
            dataPoints1: [],
            dataPoints2: [],
            dataPoints3: [],
            dataPoints4: [],
            dataPoints5: [],
            playerType: 'Batters',
            seasonYear: 2019,
            team: 'Dodgers',
            minimumGames: 30,
            yearOne: 2015,
            yearTwo: 2019,
            allTeams: ['Angels', 'Astros', 'Athletics', 'Blue Jays', 'Braves', 'Brewers',
                'Cardinals', 'Cubs', 'Diamondbacks', 'Dodgers', 'Giants', 'Indians', 'Mariners',
                'Marlins', 'Mets', 'Nationals', 'Orioles', 'Padres', 'Phillies', 'Pirates',
                'Rangers', 'Rays', 'Red Sox', 'Reds', 'Rockies', 'Royals', 'Tigers', 'Twins',
                'White Sox', 'Yankees']
        }

        this.execute = this.execute.bind(this);
    }

    async componentDidMount() {
        this.getResults();
    }

    getResults() {
        var chart = this.chart;
        let url = 'http://localhost:5000/api/fantasyquery3';
        axios.get(url, {params: {
                playerType: this.state.playerType,
                seasonYear: this.state.seasonYear,
                team: this.state.team,
                minimumGames: this.state.minimumGames,
                yearOne: this.state.yearOne,
                yearTwo: this.state.yearTwo,
                p1: '',
                p2: ''
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
                    let e = [];

                    let dupNames = [];
                    for(var y=0; y < res.data.length; y++) {
                        dupNames.push(res.data[y].NAME);
                    }
                    let names = Array.from(new Set(dupNames));

                    this.setState({
                        p1: names[0],
                        p2: names[1],
                        p3: names[2],
                        p4: names[3],
                        p5: names[4]
                    })

                    for(var x=0; x < res.data.length; x++) {
                        if(res.data[x].NAME === names[0]) {
                            a.push({
                                x: res.data[x].YEAR,
                                y: res.data[x].FANTASYPOINTS
                            })
                        }
                        if(res.data[x].NAME === names[1]) {
                            b.push({
                                x: res.data[x].YEAR,
                                y: res.data[x].FANTASYPOINTS
                            })
                        }
                        if(res.data[x].NAME === names[2]) {
                            c.push({
                                x: res.data[x].YEAR,
                                y: res.data[x].FANTASYPOINTS
                            })
                        }
                        if(res.data[x].NAME === names[3]) {
                            d.push({
                                x: res.data[x].YEAR,
                                y: res.data[x].FANTASYPOINTS
                            })
                        }
                        if(res.data[x].NAME === names[4]) {
                            e.push({
                                x: res.data[x].YEAR,
                                y: res.data[x].FANTASYPOINTS
                            })
                        }
                    }

                    this.setState({
                        dataPoints1: a,
                        dataPoints2: b,
                        dataPoints3: c,
                        dataPoints4: d,
                        dataPoints5: e
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

    setTeam() {
        this.setState({
            team: this.refs.team.value
        })
    }
    setMinGames() {
        this.setState({
            minimumGames: this.refs.minGames.value
        })
    }
    setYearOne() {
        this.setState({
            yearOne: this.refs.yearOne.value
        })
    }
    setYearTwo() {
        this.setState({
            yearTwo: this.refs.yearTwo.value
        })
    }

    yearError() {
        alert("Invalid year range.");
    }

    execute() {
        if(this.refs.yearOne.value > this.refs.yearTwo.value) this.yearError();
        else this.getResults();
    }

    render() {
        //Chart Options
        const options = {
            animationEnabled: true,	
            title:{
                text: "Average Fantasy Points per Game of Selected Top 5 Players"
            },
            axisX: {
                valueFormatString: "####",
                interval: 1
			},
            axisY : {
                title: "AVG Fantasy Points",
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
                type: "column",
                name: this.state.p1,
                showInLegend: true,
                dataPoints: this.state.dataPoints1
            },
            {
                type: "column",
                name: this.state.p2,
                showInLegend: true,
                dataPoints: this.state.dataPoints2
            },
            {
                type: "column",
                name: this.state.p3,
                showInLegend: true,
                dataPoints: this.state.dataPoints3
            },
            {
                type: "column",
                name: this.state.p4,
                showInLegend: true,
                dataPoints: this.state.dataPoints4
            },
            {
                type: "column",
                name: this.state.p5,
                showInLegend: true,
                dataPoints: this.state.dataPoints5
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
            <h5 className="text-center">Fantasy Query 3</h5>
            <p className="text-center">This page displays a yearly range of average fantasy points 
                                        per game for the top 5 players (batters or pitchers) from 
                                        a specific team in a specific year and having played a selected
                                        minimum amount of games in that year.</p><br/>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <h6>Player Type</h6>
                        <select className="form-control longerButton" ref="typeSelect"
                                    onChange={this.setType.bind(this)} >
                                <option key={'b'} value={'Batters'}>Batters</option>
                                <option key={'p'} value={'Pitchers'}>Pitchers</option>
                        </select>
                    </div>
                    <div className="col-2">
                        <h6>Season Year</h6>
                        <select className="form-control selectYear" ref="yearSelect"
                                    onChange={this.setYear.bind(this)} >
                                    { _.range(1961,2020).reverse().map(y => 
                                        <option key={y} value={y}>{y}</option>
                                    )}
                        </select>
                    </div>
                    <div className="col-2">
                        <h6>Team</h6>
                        <select className="form-control longerButton" ref="team"
                                    onChange={this.setTeam.bind(this)} 
                                    defaultValue={'Dodgers'}>
                                {this.state.allTeams.map(m =>
                                    <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="col-2">
                        <h6>Minimum Games</h6>
                        <select className="form-control selectYear" ref="minGames"
                                    onChange={this.setMinGames.bind(this)} 
                                    defaultValue={30}>
                                { _.range(1,100).reverse().map(y => 
                                        <option key={y} value={y}>{y}</option>
                                )}
                        </select>
                    </div>
                </div><br/>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <h6>Year Start</h6>
                        <select className="form-control selectYear" ref="yearOne"
                                    onChange={this.setYearOne.bind(this)} 
                                    defaultValue={2015}>
                                { _.range(1961,2020).reverse().map(y => 
                                        <option key={y} value={y}>{y}</option>
                                )}
                        </select>
                    </div>
                    <div className="col-2">
                        <h6>Year End</h6>
                        <select className="form-control selectYear" ref="yearTwo"
                                    onChange={this.setYearTwo.bind(this)} 
                                    defaultValue={2019}>
                                { _.range(1961,2020).reverse().map(y => 
                                        <option key={y} value={y}>{y}</option>
                                )}
                        </select>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col text-center">
                    <button type="button" onClick={this.execute}
                        className="btn btn-primary">Execute</button>
                </div></div><br/>
                
                <div>
                    <CanvasJSChart options = {options} 
				        onRef={ref => this.chart = ref}
			        />
			        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		        </div><br /><br/><br/><br/><br/><br/><br/><br/>

                {/*<h4 className="text-center">Teams</h4>*/}
                <div className="timesheet-table">
                    <h5 className="text-center">Displaying results for FantasyQuery3:</h5>
                    
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
                </div>
            </div>
            </div>
        )
    };
}

export default FantasyQuery3;
