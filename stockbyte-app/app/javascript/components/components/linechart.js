import React, { Component } from 'react'  
import { createChart } from 'lightweight-charts'

class Linechart extends Component {  
    constructor(props){
        super(props);
            state = {
                datetime: []
    };

    async componentDidMount() {
        const response = await fetch('https://api.twelvedata.com/time_series?symbol=DJI&interval=1min&apikey=bc07ae0baa6241d79c88764a862a7dba');
        const data = await response.json(); // maybe you need this, you have to check your response
        this.setState({values: datetime});
        }
    render() {
        return (
            <div className="Chart2">
                <header className="App-header">
                    <h1>Responsive Linear chart using Chart.js</h1>
                </header>
            <article className="canvas-container">
            <Line />
            </article>
        </div>
        );
    }
}

export default Linechart