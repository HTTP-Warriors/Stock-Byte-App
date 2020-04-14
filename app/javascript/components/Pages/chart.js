import React from "react"
import { createChart } from 'lightweight-charts';

class Chart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            chartData: []
        }
        }

        componentDidMount(){
            this.getChartData()
        }

        getChartData = () => {
            fetch('https://cloud.iexapis.com/stable/stock/spy/chart/1m?token=pk_067eb8527ed4425a913836d41cd35052')
                .then((response) => {
                    return response.json()
                })
                .then((payload) => {
                    this.setState({chartData:payload})
                })
            }

    render () {
      const { chartData } = this.state
      console.log(chartData);
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
