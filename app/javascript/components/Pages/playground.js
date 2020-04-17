import React from "react"


class Playground extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      netWorth: 100000,
      unrealizedGain: 0,
      hasPlaygroundAccount: false,
      playgroundAccountData: [],
      stockList: [],
      currentPrices: {},
      stockInFocus: "",
      form: {
          symbol: ""
      },
      tradeForm: {
        quantity: ""
      },
      watchList: [],
      feedbackForm: {},
      leaderboard:[]

    }

  }
  componentDidMount(){
      this.getPortfolio()
      this.getLeaderboard()
  }
  getLeaderboard = () => {
    fetch(`/leaderboard`)
    .then((response) => {
      if(response.status === 200){
          return(response.json())
        }
      }
    )
    .then((result) => {
      this.setState({
        leaderboard: result
      })

    })
  }


  getPortfolio = () => {
    fetch(`/portfolios`)
    .then((response) => {
      if(response.status === 200){
          return(response.json())
        }
      }
    )
    .then((result) => {
        if(result.length > 1){
          this.setState({
            playgroundAccountData: result.find(value => value.name === "playground"),
            hasPlaygroundAccount: true
          })
          this.getStockList()
        }
    })
  }
  createPlaygroundAccount = () => {
      return fetch(`/portfolios`, {
          body: JSON.stringify({'name': 'playground', 'cash': 100000.00}),
          headers: {
              "Content-Type": "application/json"
          },
          method: "POST"
      })
      .then((response) => {
          if(response.ok){
            return this.getPortfolio()
          }
      })
  }

  getStockList = () => {
    fetch(`/stocks?portfolio=playground`)
      .then((response)=>{
        if(response.status === 200){
          return(response.json())
        }
      })
      .then((result)=>{
        this.setState({ stockList: result })
        result.map((stock)=>{
        this.getCurrentPrice(stock.symbol)
        })
      })
    fetch(`/stocks?portfolio=default`)
      .then((response)=>{
        if(response.status === 200){
          return(response.json())
        }
      })
      .then((result)=>{
        this.setState({ watchList: result })
        result.map((stock)=>{
        this.getCurrentPrice(stock.symbol)
        })
      })
    }

  getCurrentPrice = (symbol) => {
    fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=bc07ae0baa6241d79c88764a862a7dba`)
      .then((response)=>{
    if(response.status === 200){
       return(response.json())
     }
   })
   .then((result)=>{
     const { currentPrices } = this.state
     currentPrices[`${symbol}`] = result.price
     this.setState({
       currentPrices: currentPrices
     })
   })
  }

  createStock = () => {
    return fetch(`/stocks?portfolio=playground`, {
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

  validSymbol = (symbol) => {
    fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=bc07ae0baa6241d79c88764a862a7dba`)
      .then((response)=>{
        if(response.status === 200){
           return(response.json())
         }
      })
      .then((result)=>{
        console.log(result);
        if(result.price){
          return true
        }else{
          return false
        }
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { form } = this.state
    fetch(`https://api.twelvedata.com/price?symbol=${form.symbol}&apikey=bc07ae0baa6241d79c88764a862a7dba`)
      .then((response)=>{
        if(response.status === 200){
           return(response.json())
         }
      })
      .then((result)=>{
        if(result.price){
          this.createStock(form.symbol)
          this.setState({
            stockInFocus: form.symbol
          })
        }
      })

  }


  handleChange = (event) => {
      let { form } = this.state
      form[event.target.name] = event.target.value.toUpperCase()
      this.setState({
        form: form
      })
  }

  validTrade = (tradeForm) => {
    this.getStockList()
    const { playgroundAccountData, stockList } = this.state
    let action = tradeForm.action
    let quantity = tradeForm.quantity
    let symbol = this.state.stockInFocus
    let currentPrice = this.state.currentPrices[`${ symbol }`]
    let cash = playgroundAccountData.cash
    let value = currentPrice * quantity * action
    let position = stockList.find(value => value.symbol === symbol).total_quantity
    if(action == 1 && cash >= value){
      return { value: value, tradeForm: { action: 1, quantity: quantity, price: currentPrice } }
    }else if(action == -1 && quantity <= position){
      return { value: value, tradeForm: { action: -1, quantity: quantity, price: currentPrice } }
    }else{
      return {}
    }
  }


  createTrade = (request) => {
    let symbol = this.state.stockInFocus
    let validForm = this.validTrade(request)
    if(validForm.tradeForm){
        return fetch(`/trades?portfolio=playground&stock=${symbol}`, {
          body: JSON.stringify(validForm.tradeForm),
          headers: {
            "Content-Type": "application/json"
          },
          method: "Post"
          })
          .then((response) => {
            if(response.ok){
              this.updatePortfolio(validForm.value)
              this.getStockList()
              this.setState({
                feedbackForm: validForm.tradeForm
              })
            }
          })
        }else{
        alert("something is wrong, cannot place the trade")
      }
  }


  handleBuySubmit = (event) => {
    event.preventDefault()
    let { tradeForm } = this.state
    tradeForm.action = 1
    this.createTrade(this.state.tradeForm)
  }
  handleSellSubmit = (event) => {
    event.preventDefault()
    let { tradeForm } = this.state
    tradeForm.action = -1
    this.createTrade(this.state.tradeForm)
  }
  // store what user entered to form
  handleTradeChange = (event) => {
    let { tradeForm } = this.state
    tradeForm[event.target.name] = event.target.value
    this.setState({ tradeForm: tradeForm })
  }

  updatePortfolio = (value) => {
    const { playgroundAccountData } = this.state
    let cash = playgroundAccountData.cash
    let id = playgroundAccountData.id
    let portfolioParams = {
      cash: cash - value
    }
    fetch(`/portfolios/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({ portfolio: portfolioParams }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        return this.getPortfolio()
      })
  }

  setStockInFocus = (symbol) => {
    this.setState({
      stockInFocus: symbol
    })
    this.getStockList()
  }

  resetFeedback = () => {
    this.setState({
      feedbackForm:{}
    })
  }

  render(){
    console.log(this.state.leaderboard);
    const { playgroundAccountData, stockList, currentPrices, watchList } = this.state
    let netWorth = playgroundAccountData.cash
    let unrealizedGain = 0
    if(stockList.length > 0){
      stockList.map(stock => netWorth += stock.total_quantity * currentPrices[`${ stock.symbol }`])
      unrealizedGain = netWorth - (playgroundAccountData.total_cost + playgroundAccountData.cash)
    }
    const roundToTwo = (number) =>{
      return Math.round((number)*100)/100
    }
    return(
      <>
        { !this.state.hasPlaygroundAccount &&
          <div>
            <h4>Are you ready to enter the playground? You will be given $100,000 Virtual Money to start.</h4>
            <button type="button" class="btn btn-primary btn-lg"
              onClick={() => this.createPlaygroundAccount()}>
            Yes
            </button>
          </div>
        }
        { this.state.hasPlaygroundAccount &&
          <div>
          <div class="row">
            <div class="col-sm-3">
            <div>
              <table>
                <tr >
                  <th scope="row">Cash: </th>
                  <td>${ Math.round(playgroundAccountData.cash*100)/100 }</td>
                </tr>
                <tr >
                  <th scope="row">Net Worth: </th>
                  <td>${ Math.round(netWorth*100)/100 }</td>
                </tr>
                <tr >
                  <th scope="row">Total Gain/Loss: </th>
                  <td>${ Math.round((netWorth-100000)*100)/100 }</td>
                </tr>
                <tr >
                  <th scope="row">Unrealized Gain/Loss: </th>
                  <td>${ Math.round(unrealizedGain*100)/100 }</td>
                </tr>
              </table>

              <table class="table table-hover">
                <thead>
                  <tr class="table-primary">
                    <th scope="col">Symbol</th>
                    <th scope="col">Average Price</th>
                    <th scope="col">Position</th>
                    <th scope="col">Current Price</th>
                    <th scope="col">Gain/Loss</th>
                  </tr>
                </thead>
                <tbody>
                { (stockList?stockList.filter(stock => stock.total_quantity>0):[]).map((stock, index) => {
                  return(
                    <tr  key={ index } onClick={() => this.setStockInFocus(stock.symbol)}>
                      <th scope="row">
                        { stock.symbol }
                      </th>
                      <td>{ roundToTwo(stock.average_price) }</td>
                      <td>{ stock.total_quantity }</td>
                      <td>{ roundToTwo(currentPrices[`${ stock.symbol }`])}</td>
                      <td>{ roundToTwo((currentPrices[`${ stock.symbol }`] * stock.total_quantity - stock.value))}</td>
                    </tr>)}
                  )
                }
                </tbody>
              </table>
              </div>
            </div>
            <div class="col-sm-6">
            {this.state.stockInFocus &&
              <div>
                <h1>{ this.state.stockInFocus }</h1>
                <img src={`https://finviz.com/chart.ashx?t=${this.state.stockInFocus}&ty=c&ta=0&p=d`} style={{width:"70%"}}/>
                <h4>Current Price: { roundToTwo(currentPrices[`${ this.state.stockInFocus }`]) }</h4>
                <h4>Average Price: { stockList.find(value => value.symbol === this.state.stockInFocus)?roundToTwo(stockList.find(value => value.symbol === this.state.stockInFocus).average_price):0 }</h4>
                <h4>Current Position: { stockList.find(value => value.symbol === this.state.stockInFocus)?stockList.find(value => value.symbol === this.state.stockInFocus).total_quantity:0 }</h4>
                <h4>Maximum shares can buy: { Math.floor(playgroundAccountData.cash/currentPrices[`${ this.state.stockInFocus }`]) }</h4>

              </div>
            }
            </div>
            <div class="col-sm-3">
            <h3>Watch List</h3>
            <table class="table table-hover">
              <thead>
                <tr class="table-info">
                  <th scope="col">Symbol</th>
                  <th scope="col">Current Price</th>
                </tr>
              </thead>
              <tbody>
              { watchList.map((stock, index) => {
                return(
                  <tr key={ index } onClick={() => this.setStockInFocus(stock.symbol)}>
                    <th scope="row">
                      { stock.symbol }
                    </th>
                    <td>{ roundToTwo(currentPrices[`${ stock.symbol }`])}</td>
                  </tr>)}
                )
              }
              </tbody>
            </table>



            </div>
          </div>


          <div>
            { this.state.feedbackForm.action &&
              <div class="alert alert-dismissible alert-info">
              <button type="button" class="close" data-dismiss="alert" onClick={() => this.resetFeedback()}>&times;</button>
              <strong>Your order is placed! </strong>
              {(this.state.feedbackForm.action == 1)?'Bought':'Sold'} { this.state.stockInFocus } { this.state.feedbackForm.quantity } shares at { roundToTwo(this.state.feedbackForm.price) }.
            </div>
            }
          </div>

          <div class="row">
            <div class="col-sm-3">
            <div class="form-group">
                <label class="col-form-label" for="inputDefault">Find a stock</label>
                <input onChange={ this.handleChange } type="text" class="form-control" name="symbol" Placeholder="Enter Stock Symbol Here" style={{width:"70%"}}/>
                <button type="submit" onClick= { this.handleSubmit } class="btn btn-info">Find</button>
            </div>
          </div>
            <div class="col-sm-9">
            <form>
              <div class="form-group">
                <label class="col-form-label" for="inputDefault">Quantity of stocks</label>
                <input style={{width:"20%"}} onChange={ this.handleTradeChange } type="text" class="form-control" name="quantity"/>
                <button type="submit" onClick= { this.handleBuySubmit } class="btn btn-success" >Buy</button>
                <button type="submit" onClick= { this.handleSellSubmit } class="btn btn-danger">Sell</button>
              </div>
            </form>
            </div>
          </div>

          </div>
        }
      </>

    )
  }
}

export default Playground
