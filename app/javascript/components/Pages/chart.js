import React from "react"
import { createChart } from 'lightweight-charts';

class Chart extends React.Component {
        getChartData = () => {
            const { chartData } = this.props
            let lightChartData = []
            chartData.map((element,index)=>{
            let chartObject = { time: element.date, value: element.close }
            lightChartData.push(chartObject)
            })
            
            const chart = createChart(document.getElementById("homeChart"), { responsive: true, width: 400, height: 300 });
            chart.resize(400, 300)
            const lineSeries = chart.addLineSeries();
            let chartShow = lineSeries.setData(lightChartData)
            return chartShow;
        }

    render () {
    

    return (
        <>
            { this.getChartData() }
        </>
        );
    }
}
export default Chart