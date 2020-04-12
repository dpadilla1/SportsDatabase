import React from 'react';
import '../stylesheets/Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <br /><br/>
                        <h2>Welcome!</h2><br/>
                        <p>Created by Group 10</p>
                        <p>Derek Padilla<br/>
                            Aristotle Tesser</p>
                    </div>
                </div>
            </div>
        )
    };
}

export default Home;
