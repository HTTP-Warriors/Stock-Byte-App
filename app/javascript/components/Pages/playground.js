import React from "react"


class Playground extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      netWorth: 100000,
      unrealizedGain: 0,
      hasPlaygroundAccount: false,
      playgroundAccountData: [],
      stockList:[],
      currentPrices:{},
      stockInFocus:"",
      form: {
          symbol: ""
      },
      tradeForm: {
        quantity:""
      }
    }

  }
  componentDidMount(){
      this.getPortfolio()
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
            playgroundAccountData: result[1],
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
     currentPrices[`${symbol}`] = parseFloat(result.price).toFixed(2)
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

  render(){
    const { playgroundAccountData, stockList, currentPrices } = this.state
    let netWorth = playgroundAccountData.cash
    let unrealizedGain = 0
    if(stockList.length > 0){
      stockList.map(stock => netWorth += stock.total_quantity * currentPrices[`${ stock.symbol }`])
      unrealizedGain = netWorth - (playgroundAccountData.total_cost + playgroundAccountData.cash)
    }
    return(
      <>
        <h1>Playground</h1>
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
                <h4>Cash: ${ playgroundAccountData.cash.toFixed(2) }</h4>
                <h4>Net Worth: ${ netWorth.toFixed(2) }</h4>
                <h4>Total Gain/Loss: ${ (netWorth-100000).toFixed(2) }</h4>
                <h4>Unrealized Gain/Loss : ${ unrealizedGain.toFixed(2) }</h4>
              </div>

              <table class="table table-hover">
                <thead>
                  <tr>
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
                    <tr class="table-dark" key={ index }>
                      <th scope="row">
                        <a href={`/stock/${ stock.symbol }`}>{ stock.symbol }</a>
                        <br />
                      </th>
                      <td>{ stock.average_price.toFixed(2) }</td>
                      <td>{ stock.total_quantity }</td>
                      <td>{ currentPrices[`${ stock.symbol }`]}</td>
                      <td>{ (currentPrices[`${ stock.symbol }`] * stock.total_quantity - stock.value).toFixed(2) }</td>
                    </tr>)}
                  )
                }
                </tbody>
              </table>

            </div>
            <div class="col-sm-6">
              <h1>{ this.state.stockInFocus }</h1>
            </div>
            <div class="col-sm-3">.col-sm-3</div>
          </div>





            <div class="form-group">
                <label class="col-form-label" for="inputDefault">Find a stock</label>
                <input onChange={ this.handleChange } type="text" class="form-control" name="symbol" Placeholder="Enter Stock Symbol Here"/>
                <button type="submit" onClick= { this.handleSubmit }>Find</button>
            </div>


            <form>
              <div class="form-group">
                <label class="col-form-label" for="inputDefault">Quantity of stocks</label>
                <input onChange={ this.handleTradeChange } type="text" class="form-control" name="quantity"/>
                <button type="submit" onClick= { this.handleBuySubmit } >Buy</button>
                <button type="submit" onClick= { this.handleSellSubmit } >Sell</button>
              </div>
            </form>



          </div>
        }
      </>
    )
  }
}

export default Playground
