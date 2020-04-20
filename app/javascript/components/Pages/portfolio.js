import React from "react"
import { Redirect } from "react-router-dom"
import 'bootswatch/dist/united/bootstrap.min.css'
import Flexbox from 'flexbox-react';
import Box from '@material-ui/core/Box'


class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.state={
            stockList:[],
            form: {
                symbol: ""
            },
            currentPrices: {},
            stockStatus: "HIDE",
            stockInfo: {},
            stockQuotes: {}
        }
    }
    componentDidMount(){
        this.getStockList()
    }

    // this method retrieve stock list of current_user's default portfolio
    getStockList = () => {
      fetch(`/stocks?portfolio=default`)
        .then((response)=>{
          if(response.status === 200){
            return(response.json())
          }
        })
        .then((result)=>{
          this.setState({
            stockList:result
          })
          result.map((stock)=>{
            this.getCurrentPrice(stock.symbol)
            this.getStockQuote(stock.symbol)
          })
        })
      }

    // this method retrieve current price by given symbol, then create one property in currentPrices object
    getCurrentPrice = (symbol) => {
      fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=bc07ae0baa6241d79c88764a862a7dba`)
        .then((response)=>{
      if(response.status === 200){
         return(response.json())
       }
     })
     .then((result)=>{
       const { currentPrices } = this.state
       currentPrices[`${symbol}`] = parseFloat(result.price).toFixed(2)
       this.setState({
         currentPrices: currentPrices
       })
     })
    }

    // method to get stock quote information, then store in stockQuotes object
    getStockQuote = (symbol) => {
      fetch(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=bc07ae0baa6241d79c88764a862a7dba`)
        .then((response)=>{
         if(response.status === 200){
           return(response.json())
         }
        })
        .then((result)=>{
          const { stockQuotes } = this.state
          stockQuotes[`${symbol}`] = result
          this.setState({
           stockQuote: stockQuotes
          })
        })
    }

    // use iexapis api to check the symbol can have a current price when user enters one. If user entered a valid symbol, will get current stock info from iexapis and use getCurrentPrice, and set stockStatus to "NEW" so we can know it is ready to add into the portfolio. If user entered an invalid symbol, set stockStatus to "INVALID", so we can tell user to enter again.
    getStockInfo = (symbol) => {
      fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_3e33ec663d95431bac64f43bb0586cd7`)
        .then((response)=>{
      if(response.status === 200){
         return(response.json())
       }else if(response.status === 404){
         return(response.status)
       }
     })
     .then((result)=>{
       if (result === 404){
         this.setState({
           stockStatus : "INVALID"
         })
       }else{
         this.getCurrentPrice(symbol)
         this.getStockQuote(symbol)
         this.setState({
           stockStatus: "NEW",
           stockInfo: result
         })
       }
     })
   }

    // check whether the entered symbol is in the portfolio. If it is already there, set stockStatus to "OLD", so we can let user know it is already in the list. If it is a new one, pass that symbol to getStockInfo
    handleSubmit = (event) => {
      event.preventDefault()
      const { form, stockList } = this.state
      let inPortfolio = false
      stockList.map((stock)=>{
        if(stock.symbol===form.symbol){
          inPortfolio = true
        }
      })
      if(inPortfolio){
        this.setState({
          stockStatus: "OLD"
        })
      }else{
        this.getStockInfo(form.symbol)
      }

    }
    // set what user entered in form, and if user is entering something, set stockStatus to "HIDE"
    handleChange = (event) => {
        let { form } = this.state
        form[event.target.name] = event.target.value.toUpperCase()
        this.setState({
          stockStatus: "HIDE",
          form: form
        })
    }


    // method to add a new stock into the list, using form in the state
    createStock = () => {
      return fetch(`/stocks?portfolio=default`, {
          body: JSON.stringify(this.state.form),
          headers: {
              "Content-Type": "application/json"
          },
          method: "POST"
      })
      .then((response) => {
          if(response.ok){
              return this.getStockList()
          }
      })
    }

    // method to delete a stock by id
    handleDelete = (id) => {
      fetch(`/stocks/${id}?portfolio=default`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
          }
        }
      ).then((response) => {
        if(response.ok){
          alert("this stock is deleted")
          return this.getStockList()
        }
      })
      }

    render () {
    const { stockInfo, stockList, currentPrices, stockQuotes } = this.state
    let netWorth = 0
    let totalCost = 0
    stockList.map((stock) => {
      netWorth += currentPrices[`${stock.symbol}`] * stock.total_quantity
      totalCost += stock.value
    })
    console.log(stockQuotes);
    return (

        <React.Fragment>

<div className="page-wrap">
        <div class="grid-container">
            <div>
                  <h1>Portfolio List</h1>
                  <p><h2>Net Worth: $ { netWorth.toFixed(2) }</h2></p>
                  <p><h2>Total Gain/Loss: $ { (netWorth - totalCost).toFixed(2) }</h2></p>
            </div>

            <div>




              <div>
              {/* find stock inputbox and button */}
                        <div className="container">
                            <div className="form-inline my-2 my-lg-0">
                                <label className="active-pink-3 active-pink-4 mb-4" for="inputDefault"><h2>Find a stock</h2></label>
                            </div>

                        <div className="form-inline my-2">
                              <input className="form-control" onChange={ this.handleChange } type="text" class="form-control" name="symbol" Placeholder="Enter Stock Symbol Here"/>
                              <button className="btn btn-outline-warning my-2 my-sm-0" type="submit" onClick= { this.handleSubmit }>Find</button>
                        </div>
              </div>



              {/* if the user enters a new valid stock, show stock info card */}

              <div>
                              <div className="container">

                                        { this.state.stockStatus=="NEW" &&
                                            <div>
                                                  <div class="card border-primary mb-3" style={{ maxWidth: "100%" }}>
                                                        <div class="card-header">New Stock</div>
                                                          <div class="card-body">
                                                                  <h4 class="card-title">{ stockInfo.symbol } { currentPrices[`${ stockInfo.symbol }`] }
                                                                        <button type="button" class="btn btn-success pull-right" onClick={() => this.createStock()}>Add</button>
                                                                  </h4>
                                                              <p class="card-text">{ stockInfo.companyName }</p>
                                                              <p class="card-text">{ stockInfo.exchange }</p>
                                                              <p class="card-text">{ stockInfo.industry }</p>
                                                              <p class="card-text">{ stockInfo.description }</p>
                                                          </div>
                                                   </div>
                                            </div>
                                        }
                              </div>
                              <div className="container">
                              {/* if user enters a invalid symbol, show error message */}
                                        { this.state.stockStatus=="INVALID" &&
                                          <div>
                                          <h1>Sorry, Can't find that stock. Please enter the correct symbol.</h1>
                                          </div>
                                        }

                              {/* if user enters a symbol already in list, show error message */}
                                        { this.state.stockStatus=="OLD" &&
                                          <div>
                                          <h1>This stock is already in your portfolio.</h1>
                                          </div>
                                        }
                              </div>
                          </div>
                    </div>
                </div>
                {/* Portfolio table */}
                              <div className="containerStuff">
                                    <table class="table table-hover">
                                              <thead>
                                                <tr>
                                                  <th scope="col">Symbol</th>
                                                  <th scope="col">Average Price</th>
                                                  <th scope="col">Quantity</th>
                                                  <th scope="col">Current Price</th>
                                                  <th scope="col">Gain/Loss</th>
                                                  <th scope="col">Delete</th>
                                                </tr>
                                              </thead>


                                              <tbody>

                                              { stockList.map((stock, index) => {
                                                return(

                                                      <tr class="table-dark" key={ index }>

                                                            <td scope="row">
                                                              <a href={`/stock/${ stock.symbol }`}>{ stock.symbol }</a>
                                                              <br />
                                                              <small>{ stockQuotes[`${ stock.symbol }`]?stockQuotes[`${ stock.symbol }`].name: null }</small>
                                                            </td>


                                                            <td>{ stock.average_price.toFixed(2) }</td>
                                                            <td>{ stock.total_quantity }</td>
                                                            <td>{ currentPrices[`${ stock.symbol }`]}</td>
                                                            <td>{ (currentPrices[`${ stock.symbol }`] * stock.total_quantity - stock.value).toFixed(2) }</td>
                                                            <td><button type="button" class="btn btn-danger btn-sm" onClick={() => this.handleDelete(`${ stock.id }`)}>Delete</button></td>
                                                            </tr>
                                                    )
                                                  }
                                                )
                                              }
                                              </tbody>
                                    </table>
                                </div>
            </div>
            </div>
        </React.Fragment>

        );
    }
}

export default Portfolio
