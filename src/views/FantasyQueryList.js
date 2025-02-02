import React from 'react';
import FantasyNavbar from "../components/fantasynavbar.component";
import { Link } from 'react-router-dom';
import '../stylesheets/Home.css';

class FantasyQueryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <FantasyNavbar /><br />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <br /><br/>
                            <h4 className="text-center">Fantasy Query List</h4><br/>
                            <table className="table table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th style={{"width":"15%"}}>Link</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><Link to="/fantasyquery1" className="nav-link">FantasyQuery1</Link></td>
                                        <td>This page displays the total fantasy points of the 
                                            top fantasy players in the NFL by a selected year,
                                            player type, scoring type. This can provide valuable
                                            information on the rate at which value diminishes by 
                                            player position and scoring type.</td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/fantasyquery2" className="nav-link">FantasyQuery2</Link></td>
                                        <td>This page displays the 5-number summary of the fantasy points
                                        of a selected number of top players of sports leagues by year.
                                        The graphic allows for the comparison of how value falls off 
                                        as rank decreases. This provides information that can be helpful
                                        in determining optimal draft strategies based on the type of
                                        fantasy league that is being played.</td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/fantasyquery3" className="nav-link">FantasyQuery3</Link></td>
                                        <td>This page displays a yearly range of average fantasy points 
                                        per game for the top 5 players (batters or pitchers) from 
                                        a specific team in a specific year and having played a selected
                                        minimum amount of games in that year.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default FantasyQueryList;
