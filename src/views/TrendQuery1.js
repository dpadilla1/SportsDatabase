import React from 'react';
import axios from 'axios';
import '../stylesheets/TestQuery1.css';
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
            dataPoints3: [],
            dataPoints4: [],
            dataPoints5: [],
            seasonYear: 2019,
            playType: 'RUSH',
            allTeams: ['NONE','ARI','ATL','BAL','BUF','CAR','CHI','CIN','CLE','DAL','DEN',
                'DET','GB','HOU','IND','JAX','KC','LAC','LA','MIA','MIN','NE',
                'NO','NYG','NYJ','OAK','PHI','PIT','SEA','SF','TB','TEN','WAS'],
            team1: 'ARI',
            team2: 'ATL',
            team3: 'BAL',
            team4: 'BUF',
            team5: 'CAR'
        }

        this.execute = this.execute.bind(this);
    }

    async componentDidMount() {
        this.getResults();
    }

    getResults() {
        var chart = this.chart;
        let tL = [];
        tL.push(this.state.team1,this.state.team2,this.state.team3,
            this.state.team4,this.state.team5);
        let url = 'http://localhost:5000/api/trendquery1';
        axios.get(url, {params: {
                seasonYear: this.state.seasonYear,
                playType: this.state.playType,
                teamList: tL
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
                    for(var x=0; x < res.data.length; x++) {
                        if(res.data[x].OFFENSETEAM === this.state.team1) {
                            a.push({
                                y: res.data[x].AVGYARDS,
                            label: res.data[x].MONTH
                            })
                        }
                        if(res.data[x].OFFENSETEAM === this.state.team2) {
                            b.push({
                                y: res.data[x].AVGYARDS,
                            label: res.data[x].MONTH
                            })
                        }
                        if(res.data[x].OFFENSETEAM === this.state.team3) {
                            c.push({
                                y: res.data[x].AVGYARDS,
                            label: res.data[x].MONTH
                            })
                        }
                        if(res.data[x].OFFENSETEAM === this.state.team4) {
                            d.push({
                                y: res.data[x].AVGYARDS,
                            label: res.data[x].MONTH
                            })
                        }
                        if(res.data[x].OFFENSETEAM === this.state.team5) {
                            e.push({
                                y: res.data[x].AVGYARDS,
                            label: res.data[x].MONTH
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
            playType: this.refs.typeSelect.value
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
    setTeam3() {
        this.setState({
            team3: this.refs.team3.value
        })
    }
    setTeam4() {
        this.setState({
            team4: this.refs.team4.value
        })
    }
    setTeam5() {
        this.setState({
            team5: this.refs.team5.value
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
                text: "Average Rushing/Passing Yards by Team in NFL"
            },
            axisY : {
                title: "Yards",
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
                type: "line",
                name: this.state.team1,
                showInLegend: true,
                dataPoints: this.state.dataPoints1
            },
            {
                type: "line",
                name: this.state.team2,
                showInLegend: true,
                dataPoints: this.state.dataPoints2
            },
            {
                type: "line",
                name: this.state.team3,
                showInLegend: true,
                dataPoints: this.state.dataPoints3
            },
            {
                type: "line",
                name: this.state.team4,
                showInLegend: true,
                dataPoints: this.state.dataPoints4
            },
            {
                type: "line",
                name: this.state.team5,
                showInLegend: true,
                dataPoints: this.state.dataPoints5
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
                            <td>{r.SEASONYEAR}</td>
                            <td>{r.MONTH}</td>
                            <td>{r.PLAYTYPE}</td>
                            <td>{r.OFFENSETEAM}</td>
                            <td>{r.AVGYARDS}</td>
                        </tr>
                    )
                })
            }
            else results = "No results to display.";
        }

        return (

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-2">
                        <h6>Select Season Year</h6>
                        <select className="form-control selectYear" ref="yearSelect"
                                    onChange={this.setYear.bind(this)} >
                                <option key={2015} value={2015}>{2015}</option>
                                <option key={2016} value={2016}>{2016}</option>
                                <option key={2017} value={2017}>{2017}</option>
                                <option key={2018} value={2018}>{2018}</option>
                                <option key={2019} value={2019}>{2019}</option>
                        </select>
                    </div>
                    <div className="col-2">
                        <h6>Select Play Type</h6>
                        <select className="form-control selectYear" ref="typeSelect"
                                    onChange={this.setType.bind(this)} >
                                <option key={'r'} value={'RUSH'}>Rush</option>
                                <option key={'p'} value={'PASS'}>Pass</option>
                        </select>
                    </div>
                </div><br/>
                <div className="row justify-content-center">
                    <div className="col-sm">
                        <h6>Select Team 1</h6>
                        <select className="form-control selectYear" ref="team1"
                                    onChange={this.setTeam1.bind(this)} 
                                    defaultValue={'ARI'}>
                                {this.state.allTeams.map(m =>
                                    <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="col-sm">
                        <h6>Select Team 2</h6>
                        <select className="form-control selectYear" ref="team2"
                                    onChange={this.setTeam2.bind(this)} 
                                    defaultValue={'ATL'}>
                                {this.state.allTeams.map(m =>
                                    <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="col-sm">
                        <h6>Select Team 3</h6>
                        <select className="form-control selectYear" ref="team3"
                                    onChange={this.setTeam3.bind(this)} 
                                    defaultValue={'BAL'}>
                                {this.state.allTeams.map(m =>
                                    <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="col-sm">
                        <h6>Select Team 4</h6>
                        <select className="form-control selectYear" ref="team4"
                                    onChange={this.setTeam4.bind(this)} 
                                    defaultValue={'BUF'}>
                                {this.state.allTeams.map(m =>
                                    <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="col-sm">
                        <h6>Select Team 5</h6>
                        <select className="form-control selectYear" ref="team5"
                                    onChange={this.setTeam5.bind(this)} 
                                    defaultValue={'CAR'}>
                                {this.state.allTeams.map(m =>
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
		        </div><br /><br/>

                {/*<h4 className="text-center">Teams</h4>*/}
                <div className="timesheet-table">
                    <h5 className="text-center">Displaying results for TrendQuery1:</h5>
                    
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>-</th>
                                <th>Year</th>
                                <th>Month</th>
                                <th>Play Type</th>
                                <th>Team</th>
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
