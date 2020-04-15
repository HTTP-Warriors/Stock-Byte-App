import React from "react"
import { createChart } from 'lightweight-charts';

class Chart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            chartData: []
        },  () => {
            // !
            // Add callback function that logs the value of "count"
            
            }
        }

        async componentDidMount(){
            await fetch('https://sandbox.iexapis.com/stable/stock/IBM/chart/1m?token=Tsk_8d3ccc170f2b4e59940c7906f2d4c32f')
                .then((response) => {
                    return response.json()
                })
                .then((payload) => {
                    this.setState({chartData:payload})
                })
            }

        // getChartData = () => {


    render () {
        const { chartData } = this.state
        let lightChartData = []
        chartData.map((element,index)=>{
        let chartObject = { time: element.date, value: element.close }
        lightChartData.push(chartObject)
        })
        
        const chart = createChart(document.body, { width: 400, height: 300 });
        const lineSeries = chart.addLineSeries();
        let chartShow = lineSeries.setData(lightChartData)


    return (
        <React.Fragment>
            { chartShow }
        </React.Fragment>
        );
    }
}
export default Chart