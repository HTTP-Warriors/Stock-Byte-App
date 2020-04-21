import React from "react"

class Stock extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      average_price:null,
      total_quantity:null,
      stockList:[],
      tradeList:[],
      inPortfolio:false,
      form: {
        action: "1",
        quantity: "",
        price: ""
      },
      stockQuote: {},
      stockNews: [],
      showPage: false,
      stockRatings: {}
    }
  }

  componentDidMount(){
    this.getStockList()
    this.getStockQuote()
    this.getStockNews()
    this.getStockRatings()
    }

  // method to get quote information, it is an object
  getStockQuote = () => {
    const { symbol } = this.props.match.params
    fetch(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=bc07ae0baa6241d79c88764a862a7dba`)
      .then((response)=>{
        if(response.status === 200){
        return(response.json())
      }
      })
      .then((result)=>{
        this.setState({
        stockQuote: result,
        showPage: true
        })
      })
  }
  // method to get stock last three news from iex
  getStockNews = () => {
    const { symbol } = this.props.match.params
    fetch(`https://cloud.iexapis.com/stable/stock/${ symbol }/news/last/3?token=pk_3e33ec663d95431bac64f43bb0586cd7`)
      .then((response)=>{
    if(response.status === 200){
      return(response.json())
        }
      })
      .then((result)=>{
      this.setState({
        stockNews:result
      })
      })
  }
// methods to get stocks ratings
  getStockRatings = () => {
    const { symbol } = this.props.match.params
    fetch(`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=bqa247nrh5r8t7qn5tb0`)
      .then((response)=>{
    if(response.status === 200){
      return(response.json())
        }
      })
      .then((result)=>{
        if(result[0]){
          let ratingData= result[0]
          let ratingNums = ratingData.buy + ratingData.hold + ratingData.sell
          let rating = (ratingData.buy + ratingData.hold * 2 + ratingData.sell * 3)/ratingNums
          let recommend = "Buy"
          if(rating>2.4){
            recommend = "Sell"
          }else if(rating>1.6){
            recommend = "Hold"
          }
          let buyBar = Math.round(ratingData.buy*100/ratingNums)
          let sellBar = Math.round(ratingData.sell*100/ratingNums)
          let holdBar = 100 - buyBar - sellBar
          this.setState({
            stockRatings:
            { recommend: recommend,
              buyBar: buyBar,
              sellBar: sellBar,
              holdBar: holdBar }
          })
        }
      })
  }



  //method to get stock listed in user's portfolio, then pass the list to getStock()
  getStockList = () => {
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
  // method to check if the stock of this page is in user's portfolio, if it is in, 1.retrieve the average_price and total_quantity, 2.retrieve trades index of this stock, store them in state, 3. set inPortfolio to true so we can show the trade table and add trade form.
  getStock = (stockList) => {
    const { symbol } = this.props.match.params
    let id = 0
    stockList.forEach((stock) => {
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
  //method to create a new trade
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
          return this.getStockList()
        }
      })
  }
  //method to delete a trade by id
  deleteTrade = (id) => {
    const { symbol } = this.props.match.params
    fetch(`/trades/${id}?portfolio=default&stock=${symbol}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if(response.ok){
        alert("this trade is deleted")
        return this.getStockList()
      }
    })
  }
  //method to submit the new form to createTrade()
  handleSubmit = (event) => {
    event.preventDefault()
    this.createTrade(this.state.form)
  }
  // store what user entered to form
  handleChange = (event) => {
    let { form } = this.state
    form[event.target.name] = event.target.value
    this.setState({ form: form })
  }

  render () {
    const { tradeList, stockQuote, stockNews, showPage, stockRatings} = this.state
    const { symbol } = this.props.match.params
    return (
      <React.Fragment>




{showPage && <div>

  {/* if this stock is not in user's portfolio, then user will not see the form to add a trade */}
      <div class="grid-container">
          { this.state.inPortfolio &&
            <form className="form-inline my-2 my-lg-0">
              <div class="form-group">
                <p><label >Buying or Selling</label></p>
                <p><select onChange={ this.handleChange } type="text" value = { this.state.form.action } className="form-control mr-sm-2" name="action">
                  <option value="1">Buy</option>
                  <option value="-1">Sell</option>
                </select></p>


                <p><label class="col-form-label" for="inputDefault">Quantity of stocks</label></p>
                <p><input onChange={ this.handleChange } type="text" className="form-control mr-sm-2" name="quantity"/></p>


                <p><label class="col-form-label" for="inputDefault">Price per stock</label></p>
                <p><input className="form-control mr-sm-2" onChange={ this.handleChange } type="text" class="form-control" name="price"/></p>
                <p><button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick= { this.handleSubmit }>Add this trade</button></p>
              </div>
            </form>}




            {/* stock information */}
            <div class="row">
              <div class="col-sm-4">
                      <div  className="page-wrap">
                        <h2>{ symbol.toUpperCase() }</h2>
                        <h4>{ stockQuote.name }</h4>
                        {/*}<img src={this.state.logoUrl}/>*/}
                        <p>current price is ${ Math.round(stockQuote.close*100)/100 }</p>
                        <p>${ Math.round(stockQuote.change*100)/100 } { Math.round(stockQuote.percent_change*100)/100 }%</p>
                        <p>open: ${ Math.round(stockQuote.open*100)/100 }</p>
                        <img src={`https://finviz.com/chart.ashx?t=${symbol}&ty=c&ta=0&p=d`} style={{width:"300px"}}/>
                      </div>
              </div>



              {/* if nothing in tradeList, then user will not see a trade table */}
              <div class="col-sm-4">
                      {(tradeList.length>0) &&
                        <div className="page-wrap">
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">Action</th>
                              <th scope="col">Price</th>
                              <th scope="col">Quantity</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            { tradeList.map((trade, index)=>{
                              return(
                                <tr class="table-light" key={ index }>
                                  <td>{ (trade.action===1)?"Bought":"Sold" }</td>
                                  <td>{ trade.price }</td>
                                  <td>{ trade.quantity }</td>
                                  <td>
                                    <button type="button" class="btn btn-danger btn-sm"
                                      onClick={() => this.deleteTrade(`${ trade.id }`)}>
                                    Delete
                                    </button>
                                  </td>
                                </tr>
                                )
                              })}
                          </tbody>
                        </table>
                      </div>}
                  </div>
              </div>
            </div>










{/*stock ratings*/}
        <h2><center>Analysts recommendation: { stockRatings.recommend } </center></h2>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style={{width: `${stockRatings.buyBar}%`}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-bar bg-info" role="progressbar" style={{width: `${stockRatings.holdBar}%`}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-bar bg-danger" role="progressbar" style={{width: `${stockRatings.sellBar}%`}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
        </div>


{/* stock news */}
        <div className="page-wrap">
          <h3>Latest News about { stockQuote.name }</h3>
          <div class="list-group">
            { stockNews.map((article, index) => {
              return(
                <a href={ article.url } target="_blank" class="list-group-item list-group-item-action flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{ article.headline }</h5>
                  </div>
                  <p>{ article.summary }</p>
                  <small>{ article.source }</small>
                </a>
                )
              })
            }
          </div>
        </div>








      </div>}
      </React.Fragment>
    );
  }
}

export default Stock
