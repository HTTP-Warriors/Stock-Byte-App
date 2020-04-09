// import React from "react"
//
// class About extends React.Component {
//     render () {
//
//     return (
//         <React.Fragment>
//             <h2>About Placeholder</h2>
//         </React.Fragment>
//         );
//     }
// }
//
// export default About
import React from "react"
import { createChart } from 'lightweight-charts';

class About extends React.Component {
    render () {
      const chart = createChart(document.body, { width: 400, height: 300 });
      const lineSeries = chart.addLineSeries();
      let chartShow = lineSeries.setData([
          { time: '2019-04-11', value: 80.01 },
          { time: '2019-04-12', value: 96.63 },
          { time: '2019-04-13', value: 76.64 },
          { time: '2019-04-14', value: 81.89 },
          { time: '2019-04-15', value: 74.43 },
          { time: '2019-04-16', value: 80.01 },
          { time: '2019-04-17', value: 96.63 },
          { time: '2019-04-18', value: 76.64 },
          { time: '2019-04-19', value: 81.89 },
          { time: '2019-04-20', value: 74.43 },
      ]);


    return (
        <React.Fragment>
            { chartShow }
        </React.Fragment>
        );
    }
}
export default About
