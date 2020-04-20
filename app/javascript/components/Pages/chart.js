import React from "react"
import KaktanaChart from 'kaktana-react-lightweight-charts'


class Chart extends React.Component {

    render () {
            const { chartData } = this.props
            let lightChartData = chartData.map((element)=>{
                return ({ time: element.date, value: element.close })
            })
            console.log(lightChartData)
            // const chart = createChart(document.body, { responsive: true, width: 400, height: 300 });
            // chart.resize(400, 300)
            // const lineSeries = chart.addLineSeries();
            // let chartShow = lineSeries.setData(lightChartData)
            // console.log(chartShow)
        return (
            <>
                <KaktanaChart
                    options = {{
                        alignLabels: true,
                        timeScale: {
                        rightOffset: 12,
                        barSpacing: 3,
                        fixLeftEdge: true,
                        lockVisibleTimeRangeOnResize: true,
                        rightBarStaysOnScroll: true,
                        borderVisible: false,
                        borderColor: "#fff000",
                        visible: true,
                        timeVisible: true,
                        secondsVisible: false
                    }}}
                    lineSeries = {[{
                        data: lightChartData
                    }]}
                    height = {320}
                    autoWidth
                />
            </>
            );
        }
}
export default Chart
