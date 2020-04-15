import React from "react"

class Playground extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      networth: 0,
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
        quantity:"",
        action: "1"
      }
    }
  }
  componentDidMount(){
      this.getPortfolio()
      this.getStockList()
      this.updatePortfolioValue()
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
          console.log(result)
          this.setState({
            playgroundAccountData: result[1],
            hasPlaygroundAccount: true
          })
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
        this.setState({stockList: result})
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
        stockInFocus: form.symbol
      })
    }else{
      this.createStock(form.symbol)
      this.setState({
      stockInFocus: form.symbol
      })
    }

  }

  handleChange = (event) => {
      let { form } = this.state
      form[event.target.name] = event.target.value.toUpperCase()
      this.setState({
        form: form
      })
  }

  validTrade = (tradeForm) => {
    let action = tradeForm.action
    let quantity = tradeForm.quantity
    this.getStockList()
    const { playgroundAccountData, stockList } = this.state
    let symbol = this.state.stockInFocus
    let currentPrice = this.state.currentPrices[`${ symbol }`]
    let cash = playgroundAccountData.cash
    let value = currentPrice * quantity * action
    let position = stockList.find(value => value.symbol === symbol).total_quantity
    console.log(cash,value);
    if(action == 1 && cash >= value){
      return { value: value, tradeForm: { action: 1, quantity: quantity, price: currentPrice } }
    }else if(action == -1 && quantity <= position){
      return { value: value, tradeForm: { action: -1, quantity: quantity, price: currentPrice } }
    }else{
      return {}
    }
  }


  createTrade = (request) => {
    // let action = tradeForm.action
    // this.getStockList()
    // const { stockInFocus, playgroundAccountData } = this.state
    let symbol = this.state.stockInFocus
    // let price = this.state.currentPrices[`${ symbol }`]
    // tradeForm.price = price
    // let value = price * tradeForm.quantity * tradeForm.action
    // let cash = playgroundAccountData.cash
    let validForm = this.validTrade(request)
    console.log(validForm);
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
              this.updatePortfolioValue()
              this.getStockList()
            }
          })
      }else{
        alert("something is wrong, cannot place the trade")
      }
  }


  handleTradeSubmit = (event) => {
    event.preventDefault()
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
    // let name = playgroundAccountData.name
    let id = playgroundAccountData.id
    let portfolioParams = {
      cash: cash - value
    }
    console.log(portfolioParams)
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
  updatePortfolioValue = () => {
    let { playgroundAccountData ,networth, unrealizedGain, stockList, currentPrices} =this.state
    networth = playgroundAccountData.cash
    stockList.map(value => networth += value.total_quantity * currentPrices[`${ value.symbol }`])
    unrealizedGain = networth - (playgroundAccountData.total_cost + playgroundAccountData.cash)
    console.log(networth, unrealizedGain, playgroundAccountData.cash)
    this.setState({networth: networth, unrealizedGain: unrealizedGain})
  }



  render(){
    let { playgroundAccountData, stockList, currentPrices, networth, unrealizedGain } = this.state
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
            <h4>Cash: ${ playgroundAccountData.cash }</h4>
            <h4>Networth: ${ networth }</h4>
            <h4>Unrealized Gain/Loss : ${ unrealizedGain }</h4>
            
            <div class="form-group">
                <label class="col-form-label" for="inputDefault">Find a stock</label>
                <input onChange={ this.handleChange } type="text" class="form-control" name="symbol" Placeholder="Enter Stock Symbol Here"/>
                <button type="submit" onClick= { this.handleSubmit }>Find</button>
            </div>

            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Symbol</th>
                  <th scope="col">Average Price</th>
                  <th scope="col">Quantity</th>
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

            <form>
              <div class="form-group">
                <label >Buying or Selling</label>
                <select onChange={ this.handleTradeChange } type="text" value = { this.state.tradeForm.action } class="form-control" name="action">
                  <option value="1">Buy</option>
                  <option value="-1">Sell</option>
                </select>
                <label class="col-form-label" for="inputDefault">Quantity of stocks</label>
                <input onChange={ this.handleTradeChange } type="text" class="form-control" name="quantity"/>
                <button type="submit" onClick= { this.handleTradeSubmit }>Trade</button>
              </div>
            </form>

          </div>
        }
      </>
    )
  }
}

export default Playground
