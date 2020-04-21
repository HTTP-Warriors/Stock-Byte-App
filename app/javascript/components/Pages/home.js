import React from "react"
import Flexbox from 'flexbox-react';
import background from "./background.jpg"
import Chart from "./chart"
import Chart1 from "./chart1"
import TextLoop from "react-text-loop";

class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      articles: [],
      chartData: [],
      chartData1: [],
      chartLoading: false
    }
    this.getArticles()
    this.getChart()
    this.getChart1()
  }

getArticles = () => {
  fetch('https://finnhub.io/api/v1/news?category=general&token=bqaa48nrh5r8t7qn85ig')
    .then((response) => {
      return response.json()
    })
    .then((payload) => {
      let topThree = payload.filter((value, index) => index < 3 )
      this.setState({ articles: topThree })
    })
  }

getChart = () => {
  fetch('https://sandbox.iexapis.com/stable/stock/IBM/chart/1m?token=Tsk_8d3ccc170f2b4e59940c7906f2d4c32f')
  .then((response) => {
    return response.json()
  })
  .then((payload) => {
      this.setState({chartData:payload, chartLoading:true})
  })
}

getChart1 = () => {
  fetch('https://sandbox.iexapis.com/stable/stock/AAPL/chart/1m?token=Tsk_8d3ccc170f2b4e59940c7906f2d4c32f')
  .then((response) => {
    return response.json()
  })
  .then((payload) => {
      this.setState({chartData1:payload, chartLoading:true})
  })
}

    render () {
      console.log(this.state.chartLoading && this.state.chartData)
      return (

        <div>

          <Flexbox flexDirection="column" minHeight="100%">

            <Flexbox flexGrow={1}>


            <div className="card mb-3" >
              <h3 className="card-header" >
                Let us learn about Stock Market!
              </h3>
                    <h5 className="card-header card-title">WHAT DOES STOCK MARKET DO?</h5>
                    <p><img src={ background } style={{width:"70%"}} /> </p>
                    <p className="card-subtitle text-muted">The Bull and Bear market meet UP!</p>


                  <div className="card text-white bg-warning mb-3">
                    <div className="card-header card-title"><h3>Stock market basics</h3>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                      <p>The stock market is made up of exchanges, like the New York Stock Exchange and the Nasdaq. Stocks are listed on a specific exchange, which brings buyers and sellers together and acts as a market for the shares of those stocks. The exchange tracks the supply and demand — and directly related, the price — of each stock. (Need to back up a bit? Read our explainer about stocks.)
                      </p>
                      <p>But this isn’t your typical market, and you can’t show up and pick your shares off a shelf the way you select produce at the grocery store. Individual traders are typically represented by brokers — these days, that’s often an online broker. You place your stock trades through the broker, which then deals with the exchange on your behalf. (Need a broker? See our analysis of the best stockbrokers for beginners.)
                      </p>
                      <p>The NYSE and the Nasdaq are open from 9:30 a.m. to 4 p.m. Eastern, with premarket and after-hours trading sessions also available, depending on your broker.

                      </p>
                      <a href="https://www.nerdwallet.com/article/investing/how-to-invest-in-stocks" className="btn btn-primary" target="_blank">How To invest in stocks</a> </p>
                    </div>
                  </div>
                  <div className="card text-white bg-warning mb-3">
                    <div className="card-header card-title"><h3>Understanding the stock market</h3>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                          When people refer to the stock market being up or down, they’re generally referring to one of the major market indexes.
                          <br />
                          A market index tracks the performance of a group of stocks, which either represents the market as a whole or a specific sector of the market, like technology or retail companies. You’re likely to hear most about the S&P 500, the Nasdaq composite and the Dow Jones Industrial Average; they are often used as proxies for the performance of the overall market.
                          <br />
                          Investors use indexes to benchmark the performance of their own portfolios and, in some cases, to inform their stock trading decisions. You can also invest in an entire index through index funds and exchange-traded funds, or ETFs, which track a specific index or sector of the market.
                          <br />
                      </p>
                          <a href="https://www.nerdwallet.com/blog/investing/what-is-the-stock-market/" className="btn btn-primary" target="_blank">How the market works</a>
                    </div>
                  </div>
                  <div className="card text-white bg-warning mb-3">
                    <div className="card-header card-title"><h3>Bull markets vs. bear markets</h3></div>
                    <div className="card-body">
                      <p className="card-text">
                            Neither is an animal you’d want to run into on a hike, but the market has picked the bear as the true symbol of fear: A bear market means stock prices are falling — thresholds vary, but generally to the tune of 20% or more — across several of the indexes referenced earlier.
                            <br />
                            Younger investors may be familiar with the term bear market but unfamiliar with the experience: We’ve been in a bull market — with rising prices, the opposite of a bear market — since March 2009. That makes it the longest bull run in history.
                            <br />
                            It came out of the Great Recession, however, and that’s how bulls and bears tend to go: Bull markets are followed by bear markets, and vice versa, with both often signaling the start of larger economic patterns. In other words, a bull market typically means investors are confident, which indicates economic growth. A bear market shows investors are pulling back, indicating the economy may do so as well.
                            <br />
                            The good news is that the average bull market far outlasts the average bear market, which is why over the long term you can grow your money by investing in stocks.
                            <br />
                            The S&P 500, which holds around 500 of the largest stocks in the U.S., has historically returned an average of around 7% annually, when you factor in reinvested dividends and adjust for inflation. That means if you invested $1,000 30 years ago, you could have around $7,600 today.
                            <br />
                      </p>
                          <a href="https://www.nerdwallet.com/blog/investing/average-stock-market-return/" className="btn btn-primary" target="_blank">What is avarage return</a>
                      </div>
                  </div>
            </div>
                <div className="card">
                  <div className="card-body">
                    <div>
                    {/* <p className="box-footer" align="right" style={{color: 'green'}}>
                      Do we have a footer?
                    </p>*/}
                    <h3 className="card-header card mb-3">
                        <TextLoop interval={350}>
                          <span>News</span>
                          <span>Extra</span>
                          <span>Extra</span>
                          <span>Read</span>
                          <span>All</span>
                          <span>About</span>
                          <span>It</span>
                        </TextLoop>
                        Current News
                    </h3>
                    { this.state.articles.map((article, index) => {
                      return(
                        <div key={index}>
                        <div className="card mb-3">
                        <div className="card-header">{ article.source }</div>
                          <div className="card-body">
                            <h5 className="card-title" style={{color: 'darkblue'}}>{ article.headline }</h5>
                            <h6 className="card-subtitle mb-2 text-muted"> Source: { article.source } </h6>
                            <p className="card-text">{article.summary}</p>
                            <p align="right"><a href={article.url} className="btn btn-primary" align="right" target="_blank">Continue Reading Here</a></p>
                          </div>
                        </div>
                    </div>
                      );
                    }) }
                    </div>





                        <div className="card-body">
                        <div id="homeChart">
                        <h2>IBM</h2>
                        <h3>International Business Machines Corp.</h3>
                        { this.state.chartLoading ? <Chart chartData = {this.state.chartData}  /> : "Oh well" }
                        </div>
                        </div>



                        <div className="card-body">
                        <div id="homeChart1">
                        <h2>AAPL</h2>
                        <h3>Apple Inc</h3>
                        { this.state.chartLoading ? <Chart1 chartData1 = {this.state.chartData1}  /> : "Oh well" }
                        </div>
                          <a href="https://iexcloud.io" className="card-link" target="_blank"> Chart Data provided by IEX Cloud</a> <br />
                          <a href="https://www.tradingview.com/" className="card-link" target="_blank">Chart Graph provided by Trading View</a>
                        </div>
                  </div>




                  </div>

                </Flexbox>


            <Flexbox element="footer" height="60px">
              <div className="blockquote">
                <div>
                  <table className="table table-hover">
                    <thead>
                      <tr className="table-warning">
                          <th scope="row">
                          <button type="button" className="btn btn-outline-warning btn-lg">
                          L E A R N to
                          </button>
                          </th>
                          <td>
                            <button type="button" className="btn btn-outline-warning btn-lg">
                            <TextLoop interval={550}>
                              <span>Trade faster</span>
                              <span>Increase sales</span>
                              <span>Spot Stock winners</span>
                              <span>Price perfectly</span>
                              <span>Be on Top</span>
                            </TextLoop>
                            </button>
                          </td>
                          <td>
                          <button type="button" className="btn btn-outline-warning btn-lg">
                          on S T O C K  B Y T E  by
                          </button>
                          </td>
                          <td>
                          <button type="button" className="btn btn-outline-warning btn-lg">
                            <TextLoop  interval={450} style>
                              <span>Joe</span>
                              <span>Jeremy</span>
                              <span>Richie</span>
                              <span>Xena</span>
                            </TextLoop>{" "}
                            !!!
                          </button>
                          </td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </Flexbox>
          </Flexbox>

        </div>
        );
    }
}

export default Home
