import React from "react"
import KaktanaChart from 'kaktana-react-lightweight-charts'

class Chart extends React.Component {

    render () {
            const { chartData } = this.props
            let lightChartData = chartData.map((element)=>{
                return ({ time: element.date, value: element.close })
                })
        return (
            <>
                <KaktanaChart
                    options = {{
                        options: {
                            color: "#E0B64A",
                            },
                        localization: {
                            dateFormat: "yyyy/MMMM/dd",
                            priceFormatter: function(price) {
                                // add $ sign before price
                    
                                return '$' + price;

                                },
                            },
                        grid: {
                            vertLines: {
                                color: "#E0B64A",
                                style: 1,
                                visible: true,
                            },
                            horzLines: {
                                color: "#E0B64A",
                                style: 1,
                                visible: true,
                            },
                        },
                        priceScale: {
                            position: 'right',
                            mode: 1,
                            autoScale: true,
                            invertScale: false,
                            alignLabels: true,
                            borderVisible: true,
                            borderColor: "#E0B64A",
                            scaleMargins: {
                                top: 0.30,
                                bottom: 0.25,
                                },
                        },
                        crosshair: {
                            vertLine: {
                                color: "#E0B64A",
                                width: 1,
                                style: 0,
                                visible: true,
                                labelVisible: false,
                            },
                            horzLine: {
                                color: "#E0B64A",
                                width: 1,
                                style: 0,
                                visible: true,
                                labelVisible: true,
                            },
                            mode: 1,
                        },
                        timeScale: {
                            rightOffset: 0,
                            barSpacing: 30,
                            fixLeftEdge: true,
                            lockVisibleTimeRangeOnResize: true,
                            rightBarStaysOnScroll: true,
                            borderVisible: true,
                            borderColor: "#E0B64A",
                            visible: true,
                            timeVisible: true,
                            secondsVisible: false
                        }
                        }}
                    lineSeries =
                    {[{
                        data: lightChartData
                    }]}
                    height = {220}
                    width = {300}
                />
            </>
            );
        }
}
export default Chart
