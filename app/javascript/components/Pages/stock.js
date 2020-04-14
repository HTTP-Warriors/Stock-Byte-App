import React from "react"

class Stock extends React.Component {
  constructor(props){
    super(props)
    this.state={
      currentPrice:null,
      average_price:null,
      total_quantity:null,
      stockList:[],
      tradeList:[],
      inPortfolio:false,
      form: {
        action: "1",
        quantity: "",
        price: ""
      }
    }
    this.getCurrentPrice()
    this.getStockInfo()
  }
  componentDidMount(){
    this.getCurrentPrice()
    this.getStockInfo()
    }

  getCurrentPrice = () => {
    const { symbol } = this.props.match.params
    fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=bc07ae0baa6241d79c88764a862a7dba`)
    .then((response)=>{
     if(response.status === 200){
       return(response.json())
     }
   })
   .then((result)=>{
     this.setState({
       currentPrice: parseFloat(result.price).toFixed(2)
     })
   })
  }

  getStockInfo = () => {
    fetch(`/stocks?portfolio=default`)
      .then((response)=>{
        if(response.status === 200){
          return(response.json())
        }
      })
      .then((result)=>{
        this.getStock(result)
      })
  }
  getStock = (stockList) => {
    const { symbol } = this.props.match.params
    let id = 0
    stockList.forEach((stock)=>{
      if(stock.symbol === symbol){
        id = stock.id
      }
    })
    if(id > 0){
      this.setState({
        inPortfolio: true
      })
      fetch(`/stocks/${id}?portfolio=default`)
    .then((response)=>{
      if(response.status === 200){
        return(response.json())
      }
    })
    .then((result)=>{
      this.setState({
        average_price: result.average_price,
        total_quantity: result.total_quantity
        })
    })
    }
    if(id > 0){
      fetch(`/trades?stock=${symbol}&portfolio=default`)
      .then((response)=>{
        if(response.status === 200){
          return(response.json())
        }
      })
      .then((result)=>{
        this.setState({
          tradeList:result
          })
      })
      }
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.createTrade(this.state.form)
  }

  handleChange = (event) => {
    let { form } = this.state
    form[event.target.name] = event.target.value
    this.setState({ form: form })
  }
  createTrade = (form) => {
    const { symbol } = this.props.match.params
    return fetch(`/trades?portfolio=default&stock=${symbol}`, {
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json"
        },
        method: "Post"
    })
    .then((response) => {
      if(response.ok){
        return this.getStockInfo()
      }
    })
  }

  deleteTrade = (id) => {
    const { symbol } = this.props.match.params
    fetch(`/trades/${id}?portfolio=default&stock=${symbol}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      if(response.ok){
        alert("this trade is deleted")
        return this.getStockInfo()
      }
    })
    }
  render () {
    const { tradeList } = this.state
    const { symbol } = this.props.match.params
    return (
      <React.Fragment>
          <h2>{ symbol.toUpperCase() }</h2>
          <p>current price is { this.state.currentPrice }</p>
          <img src={`https://finviz.com/chart.ashx?t=${symbol}&ty=c&ta=0&p=d`}/>

          {(tradeList.length>0) &&
            <div>
            <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Action</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
          { tradeList.map((trade, index)=>{
            return(
              <tr class="table-light" key={ index }>
                <td>{ (trade.action===1)?"Bought":"Sold" }</td>
                <td>{ trade.price }</td>
                <td>{ trade.quantity }</td>
                <button type="button" class="btn btn-danger btn-sm"
                  onClick={() => this.deleteTrade(`${ trade.id }`)}
                  style={{margin:"1em"}}>
                  Delete</button>
              </tr>
            )
          })}
          </tbody>
        </table>
        </div>}
        {this.state.inPortfolio &&
          <form>
          <div class="form-group">
            <label >Buying or Selling</label>
            <select onChange={ this.handleChange } type="text" value = { this.state.form.action } class="form-control" name="action">
            <option value="1">Buy</option>
            <option value="-1">Sell</option>
            </select>
            <label class="col-form-label" for="inputDefault">Quantity of stocks</label>
            <input onChange={ this.handleChange } type="text" class="form-control" name="quantity"/>
            <label class="col-form-label" for="inputDefault">Price per stock</label>
            <input onChange={ this.handleChange } type="text" class="form-control" name="price"/>
            <button type="submit" onClick= { this.handleSubmit }>Submit</button>
          </div>
        </form>
      }
      </React.Fragment>
    );
  }
}

export default Stock
