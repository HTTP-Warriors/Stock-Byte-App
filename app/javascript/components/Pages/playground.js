import React from "react"

class Playground extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hasPlaygroundAccount: false,
      playgroundAccountData: [],
      stockList:[],
      currentPrices:{},
      stockInFocus:"",
      stockStatus:"",
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
        stockInFocus: form.symbol,
        stockStatus: "OLD"
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
        stockStatus: "HIDE",
        form: form
      })
  }

  createTrade = (tradeForm) => {
    const { stockInFocus } = this.state
    let symbol = stockInFocus
    this.getStockList()
    let price = this.state.currentPrices[`${ symbol }`]
    tradeForm.price = price
    let value = price * tradeForm.quantity * tradeForm.action
    return fetch(`/trades?portfolio=playground&stock=${symbol}`, {
      body: JSON.stringify(tradeForm),
      headers: {
        "Content-Type": "application/json"
      },
      method: "Post"
      })
      .then((response) => {
        if(response.ok){
          this.updatePortfolio(value)
          return this.getStockList()
        }
      })
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
    let name = playgroundAccountData.name
    let portfolioParams = {
      name: name,
      cash: cash - value
    } 
    console.log(portfolioParams)
    fetch(`/portfolios/2`,
    {
      method: 'PUT',
      body: JSON.stringify({ portfolio:{
        cash: 5000
      } }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        return this.getPortfolio()
      })
  }



  render(){
    const { playgroundAccountData, stockList, currentPrices } = this.state
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
            <h4>Account Net Worth: ${ playgroundAccountData.cash }</h4>

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
              { stockList.filter(stock => stock.total_quantity>0).map((stock, index) => {
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
