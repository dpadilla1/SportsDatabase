import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import '../stylesheets/TestQuery1.css';
import Navbar from "../components/navbar.component";
import CanvasJSReact from '../CanvasJS/canvasjs.react';
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TrendQuery5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
            dataPoints1: [],
            dataPoints2: [],
            league: 'MLB',
            event: 'Home Run',
            seasonYear: 2018,
            team1: 'LAN',
            team2: 'NYN',
            mlbTeams: ["None","ANA","ARI","ATL","BAL","BOS","CHA","CHN","CIN",
                "CLE","COL","DET","HOU","KCA","LAN","MIA","MIL","MIN","NYA",
                "NYN","OAK","PHI","PIT","SDN","SEA","SFN","SLN","TBA","TEX","TOR","WAS"],
            mlbRange: [2018,2017,2016,2015],
            mlbEvents: ["Home Run","Batter Interference","Bunt Groundout","Bunt Lineout",
                "Bunt Pop Out","Catcher Interference","Double","Double Play","Field Error",
                "Fielders Choice","Fielders Choice Out","Flyout","Forceout","Grounded Into DP",
                "Groundout","Hit By Pitch","Intent Walk","Lineout","Pop Out","Runner Out",
                "Sac Bunt","Sac Fly","Sac Fly DP","Sacrifice Bunt DP","Single","Strikeout",
                "Strikeout - DP","Triple","Triple Play","Walk"],
            nflTeams: ["None","ARI","ATL","BAL","BUF","CAR","CHI","CIN","CLE",
                "DAL","DEN","DET","GB","HOU","IND","JAX","KC","LA","LAC","MIA",
                "MIN","NE","NO","NYG","NYJ","OAK","PHI","PIT","SEA","SF","TB","TEN","WAS"],
            nflRange: [2019,2018,2017,2016,2015],
            nflEvents: ["CLOCK STOP","EXCEPTION","EXTRA POINT","FIELD GOAL",
                "FUMBLES","KICK OFF","NO PLAY","PASS","PENALTY","PUNT","QB KNEEL","RUSH",
                "SACK","SCRAMBLE","TIMEOUT","TWO-POINT CONVERSION","TOUCHDOWN",
                "INCOMPLETE PASS", "INTERCEPTION"],
            nbaTeams: ["None","ATL","BKN","BOS","CHA","CHI","CLE","DAL","DEN",
                "DET","GSW","HOU","IND","LAC","LAL","MEM","MIA","MIL","MIN","NOP",
                "NYK","OKC","ORL","PHI","PHX","POR","SAC","SAS","TOR","UTA","WAS"],
            nbaRange: [2018],
            nbaEvents: ["Shot Make","Shot Miss","assistedShot","blockedShot","dRebound","foul","freeThrowMake",
                "freeThrowMiss","jumpBall","oRebound","playerSub","timeout","turnover",
                "violation"],
            nhlTeams: ["None","ANA","ARI","BOS","BUF","CAR","CBJ","CGY","CHI",
                "COL","DAL","DET","EDM","FLA","LAK","MIN","MTL","NJD","NSH","NYI",
                "NYR","OTT","PHI","PIT","SJS","STL","TBL","TOR","TOT","VAN","VGK","WPG","WSH"],
            nhlRange: [2015,2014,2013,2012,2011],
            nhlEvents: ["Blocked Shot","Early Intermission End","Early Intermission Start",
                "Emergency Goaltender","Faceoff","Game End","Game Official","Game Scheduled",
                "Giveaway","Goal","Hit","Missed Shot","Official Challenge","Penalty","Period End",
                "Period Official","Period Ready","Period Start","Shootout Complete","Shot",
                "Stoppage","Takeaway"],
            currentTeams: [],
            currentRange: [],
            currentEvents: []

        }

        this.execute = this.execute.bind(this);
    }

    async componentDidMount() {
        this.getResults();
        this.setLeague();
    }

    getResults() {
        var chart = this.chart;
        let url = 'http://localhost:5000/api/trendquery5';
        axios.get(url, {params: {
                league: this.state.league,
                seasonYear: this.state.seasonYear,
                event: this.state.event,
                team1: this.state.team1,
                team2: this.state.team2
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
                    for(var i=0; i < res.data.length; i++) {
                        if(this.state.league === 'MLB') {
                            if(res.data[i].TEAMABBREVIATION === this.state.team1) {
                                a.push({
                                    x: res.data[i].INNING,
                                    y: res.data[i].OCCURENCES
                                })
                            }
                            if(res.data[i].TEAMABBREVIATION === this.state.team2) {
                                b.push({
                                    x: res.data[i].INNING,
                                    y: res.data[i].OCCURENCES
                                })
                            }
                        }
                        else {
                            if(res.data[i].TEAMABBREVIATION === this.state.team1) {
                                a.push({
                                    x: res.data[i].MINUTE,
                                    y: res.data[i].OCCURENCES
                                })
                            }
                            if(res.data[i].TEAMABBREVIATION === this.state.team2) {
                                b.push({
                                    x: res.data[i].MINUTE,
                                    y: res.data[i].OCCURENCES
                                })
                            }
                        }
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

    setLeague() {
        let le = this.refs.leagueSelect.value;
        this.setState({
            league: le
        })
        if (le === 'MLB') {
            this.setState({
                currentTeams: this.state.mlbTeams,
                currentEvents: this.state.mlbEvents,
                currentRange: this.state.mlbRange
            },() => {
                this.refs.yearSelect.value = '2018'; this.setYear();
                this.refs.eventSelect.value = 'Home Run'; this.setEvent();
                this.refs.team1.value = 'LAN'; this.setTeam1();
                this.refs.team2.value = 'NYN'; this.setTeam2();
            });
        }
        if (le === 'NFL') {
            this.setState({
                currentTeams: this.state.nflTeams,
                currentEvents: this.state.nflEvents,
                currentRange: this.state.nflRange
            },() => {
                this.refs.yearSelect.value = '2019'; this.setYear();
                this.refs.eventSelect.value = 'PASS'; this.setEvent();
                this.refs.team1.value = 'GB'; this.setTeam1();
                this.refs.team2.value = 'None'; this.setTeam2();
            })
        }
        if (le === 'NBA') {
            this.setState({
                currentTeams: this.state.nbaTeams,
                currentEvents: this.state.nbaEvents,
                currentRange: this.state.nbaRange
            },() => {
                this.refs.yearSelect.value = '2018'; this.setYear();
                this.refs.eventSelect.value = 'Shot Miss'; this.setEvent();
                this.refs.team1.value = 'LAL'; this.setTeam1();
                this.refs.team2.value = 'None'; this.setTeam2();
            })
        }
        if (le === 'NHL') {
            this.setState({
                currentTeams: this.state.nhlTeams,
                currentEvents: this.state.nhlEvents,
                currentRange: this.state.nhlRange
            },() => {
                this.refs.yearSelect.value = '2015'; this.setYear();
                this.refs.eventSelect.value = 'Shot'; this.setEvent();
                this.refs.team1.value = 'LAK'; this.setTeam1();
                this.refs.team2.value = 'None'; this.setTeam2();
            })
        }
    }

    setYear() {
        this.setState({
            seasonYear: this.refs.yearSelect.value
        })
    }

    setEvent() {
        this.setState({
            event: this.refs.eventSelect.value
        })
    }

    setTeam1() {
        this.setState({
            team1: this.refs.team1.value
        })
    }
    setTeam2() {
        this.setState({
            team2: this.refs.team2.value
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
                text: "Average counts of selected occurence throughout games."
            },
            axisX: {
                //valueFormatString: "####",
                //interval: 1
            },
            axisY : [{
                title: "Occurences",
                //titleFontColor: "#4F81BC",
				//lineColor: "#4F81BC",
				//labelFontColor: "#4F81BC",
				//tickColor: "#4F81BC",
                includeZero: false
            }],
            axisY2 : [{
                //title: "BASKETS",
                //titleFontColor: "#C0504E",
				//lineColor: "#C0504E",
				//labelFontColor: "#C0504E",
				//tickColor: "#C0504E",
                includeZero: false
            }],
            toolTip: {
                shared: true
            },
            data: [{
                type: "line",
                name: this.state.team1,
                //color: "#183163",
                showInLegend: true,
                dataPoints: this.state.dataPoints1
            },
            {
                type: "line",
                name: this.state.team2,
                //color: "#90BE91",
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
                            <td>{r.TEAMABBREVIATION}</td>
                            <td>{r.INNING}</td>
                            <td>{r.MINUTE}</td>
                            <td>{r.OCCURENCES}</td>
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
            <h5 className="text-center">Trend Query 5</h5>
            <p className="text-center">This page displays the average counts of a 
                                        selected event throughtout the time of a game.
                                        With the NHL,NFL, and NBA, this would mean by 
                                        every minute. For the MLB, this would mean every 
                                        out, denoted by the inning and its subsections.</p>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <h6>League</h6>
                        <select className="form-control selectYear" ref="leagueSelect"
                                    onChange={this.setLeague.bind(this)} >
                                    <option key={'MLB'} value={'MLB'}>{'MLB'}</option>
                                    <option key={'NFL'} value={'NFL'}>{'NFL'}</option>
                                    <option key={'NBA'} value={'NBA'}>{'NBA'}</option>
                                    <option key={'NHL'} value={'NHL'}>{'NHL'}</option>
                        </select>
                    </div>
                    <div className="col-2">
                        <h6>Season Year</h6>
                        <select className="form-control selectYear" ref="yearSelect"
                                    onChange={this.setYear.bind(this)} >
                                { this.state.currentRange.map(y => 
                                    <option key={y} value={y}>{y}</option>
                                )}
                        </select>
                    </div>
                    <div className="col-3">
                        <h6>Event</h6>
                        <select className="form-control event" ref="eventSelect"
                                    onChange={this.setEvent.bind(this)} >
                                { this.state.currentEvents.map(y => 
                                    <option key={y} value={y}>{y}</option>
                                )}
                        </select>
                    </div>
                    <div className="col-2">
                        <h6>Team 1</h6>
                        <select className="form-control playerType" ref="team1"
                                    onChange={this.setTeam1.bind(this)} >
                                {this.state.currentTeams.map(m =>
                                    <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="col-2">
                        <h6>Team 2</h6>
                        <select className="form-control playerType" ref="team2"
                                    onChange={this.setTeam2.bind(this)} >
                                {this.state.currentTeams.map(m =>
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
                
                <div>
                    <CanvasJSChart options = {options} 
				        onRef={ref => this.chart = ref}
			        />
			        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		        </div><br /><br/><br/><br/><br/><br/><br/><br/><br/><br/>

                {/*<h4 className="text-center">Teams</h4>*/}
                <div className="timesheet-table">
                    <h5 className="text-center">Displaying results for TrendQuery5:</h5>
                    
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>-</th>
                                <th>Year</th>
                                <th>Team</th>
                                <th>Inning</th>
                                <th>Minute</th>
                                <th>Occurences</th>
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

export default TrendQuery5;
