import React from "react"

class Stock extends React.Component {
  constructor(props){
    super(props)
    this.state={
      currentPrice:null,
      average_price:null,
      total_quantity:null,
      stockList:[],
      tradeList:[]
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
    fetch(`http://localhost:3000/stocks?portfolio=default`)
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
      fetch(`http://localhost:3000/stocks/${id}?portfolio=default`)
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
       fetch(`http://localhost:3000/trades?stock=${symbol}&portfolio=default`)
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
          {(tradeList.length>0) &&
          <div>
            <ol>
          { tradeList.map((trade, index)=>{
            return(
              <li>
                { trade.price }, { trade.quantity }
              </li>
            )
          })}
          </ol>
        </div>}
      </React.Fragment>
    );
  }
}

export default Stock
