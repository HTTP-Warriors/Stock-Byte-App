import React from "react"
import KaktanaChart from 'kaktana-react-lightweight-charts'


class IntradayChart extends React.Component {

    render () {
            const { chartData } = this.props
            let lightChartData = chartData.filter(element=>element.average>0).map((element)=>{
                let time = new Date(`${element.date}T${element.minute}`)
                return ({ time: time.getTime() / 1000 - 25200 , value: element.average })
            })
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
export default IntradayChart