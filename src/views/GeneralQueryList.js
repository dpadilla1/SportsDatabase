import React from 'react';
import Navbar from "../components/navbar.component";
import { Link } from 'react-router-dom';
import '../stylesheets/Home.css';

class GeneralQueryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Navbar /><br />
                <div className="container">
                    <div className="row">
                        <div className="col">
                        <br /><br/>
                            <h4 className="text-center">General Query List</h4><br/>
                            <table className="table table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th style={{"width":"19%"}}>Link</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><Link to="/trendquery1" className="nav-link">TrendQuery1</Link></td>
                                        <td>This page displays the total fantasy points of the 
                                            top fantasy players in the NFL by a selected year,
                                            player type, scoring type. This can provide valuable
                                            information on the rate at which value diminishes by 
                                            player position and scoring type.</td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/trendquery2" className="nav-link">TrendQuery2 (Static)</Link></td>
                                        <td>This page displays the 5-number summary of the fantasy points
                                        of a selected number of top players of sports leagues by year.
                                        The graphic allows for the comparison of how value falls off 
                                        as rank decreases. This provides information that can be helpful
                                        in determining optimal draft strategies based on the type of
                                        fantasy league that is being played.</td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/trendquery3" className="nav-link">TrendQuery3 (Static)</Link></td>
                                        <td>This page displays a yearly range of average fantasy points 
                                        per game for the top 5 players (batters or pitchers) from 
                                        a specific team in a specific year and having played a selected
                                        minimum amount of games in that year.</td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/trendquery4" className="nav-link">TrendQuery4</Link></td>
                                        <td>This page displays counts of the major offensive scoring
                                        categories from the 4 major sports leagues of 2 selected
                                        cities for comparison. This can be seen as a sort of 
                                        excitement rating, and how entertaining sports can be 
                                        in different cities.</td>
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

export default GeneralQueryList;
