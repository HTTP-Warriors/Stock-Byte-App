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
      form: {
        action: "",
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
       currentPrice: result.price
     })
   })
  }

  getStockInfo = () => {
    fetch(`https://08894f96464f4cd596494a1683acc75d.vfs.cloud9.us-east-1.amazonaws.com/stocks?portfolio=default`)
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
      fetch(`https://08894f96464f4cd596494a1683acc75d.vfs.cloud9.us-east-1.amazonaws.com/stocks/${id}?portfolio=default`)
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
       fetch(`https://08894f96464f4cd596494a1683acc75d.vfs.cloud9.us-east-1.amazonaws.com/trades?stock=${symbol}&portfolio=default`)
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
    this.setState({ form: form})
  }
  createTrade = (form) => {
    const { symbol } = this.props.match.params
    console.log(form)
    return fetch(`https://08894f96464f4cd596494a1683acc75d.vfs.cloud9.us-east-1.amazonaws.com/trades?portfolio=default&stock=${symbol}`, {
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
  render () {
    const { tradeList } = this.state
    const { symbol } = this.props.match.params
    return (
      <React.Fragment>
          <h2>Stock Placeholder</h2>
          <p>{ symbol } current price is { this.state.currentPrice }</p>
          <p>{ symbol } average holding price is { this.state.average_price }</p>
          <p>{ symbol } quantity is { this.state.total_quantity }</p>
          <img src={`https://finviz.com/chart.ashx?t=${symbol}&ty=c&ta=0&p=d`}/>
          <form>
           <div class="form-group">
            <label >Buying or Selling</label>
            <select class="form-control" name="action">
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
          {(tradeList.length>0) &&
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
                <td>{ (trade.action===1)?"Buy":"Sell" }</td>
                <td>{ trade.price }</td>
                <td>{ trade.quantity }</td>
              </tr>
            )
          })}
          </tbody>
        </table>}
      </React.Fragment>
    );
  }
}

export default Stock
