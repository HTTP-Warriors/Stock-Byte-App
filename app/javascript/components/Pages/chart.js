import React from "react"
import { createChart } from 'lightweight-charts';

class Chart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            chartData1: [],
            drawData: []
        }
        }
    
        componentDidMount(){
            this.getChart1()
        }

        getChart1 = () => {
            fetch('https://cloud.iexapis.com/stable/stock/spy/chart/1m?token=pk_067eb8527ed4425a913836d41cd35052')
                .then((response) => {
                    return response.json()
                })
                .then((payload) => {
                    this.setState({drawData:payload})
                    return payload
                }) 
                .then( (payload) => { 
                    const {drawData, chartData1} = this.state
                    drawData.map((chartData, index) => {
                    let chartObject = {time:chartData.date, value:chartData.close }
                    
                        chartData1.push(chartObject)
                        })
                this.setState({ chartData1: chartData1 })
            })
        }
    render () {
    
    const chart = createChart(document.body, { width: 400, height: 300 });
    const lineSeries = chart.addLineSeries();
    let chartShow = lineSeries.setData(this.state.chartData1)
    console.log(this.state.chartData1)


    return (
        <React.Fragment>
            { this.state.chartData1.length > 15 && { chartShow } }
        </React.Fragment>
        );
    }
}
export default Chart