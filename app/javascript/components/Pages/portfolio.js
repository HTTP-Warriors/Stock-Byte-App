import React from "react"
import { Redirect } from "react-router-dom"

class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.state={
            stockList:[],
            form: {
                symbol: ""
            },
            currentPrices: {},
            stockStatus: "HIDE"
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
          this.setState({stockList:result})
          result.map((stock)=>{
            this.getCurrentPrice(stock.symbol)
          })
        })
      }
      //this method retrieve current price by given symbol, then create one property in currentPrices object
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
    // use external api to check the symbol can have a current price when user enters one. If user entered a valid symbol, will get current price and create new property in currentPrices object, and set stockStatus to "NEW" so we can know it is ready to add into the portfolio. If user entered an invalid symbol, set stockStatus to "INVALID", so we can tell user to enter again.
    getStockInfo = (symbol) => {
      fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=bc07ae0baa6241d79c88764a862a7dba`)
        .then((response)=>{
      if(response.status === 200){
         return(response.json())
       }
     })
     .then((result)=>{
       if (result.price){
         const { currentPrices } = this.state
         currentPrices[`${symbol}`] = parseFloat(result.price).toFixed(2)
         this.setState({
           stockStatus: "NEW",
           currentPrices: currentPrices
         })
       }else{
         this.setState({
           stockStatus : "INVALID"
         })
       }
     })
    }

    //check whether the entered symbol is in the portfolio. If it is already there, set stockStatus to "OLD", so we can let user know it is already in the list. If it is a new one, pass that symbol to getStockInfo
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

    return (
        <React.Fragment>

              <div>
                <div class="form-group">
                    <label class="col-form-label" for="inputDefault">Find a stock</label>
                    <input onChange={ this.handleChange } type="text" class="form-control" name="symbol" Placeholder="Enter Stock Symbol Here"/>
                    <button type="submit" onClick= { this.handleSubmit }>Find</button>
                </div>
                { this.state.stockStatus=="NEW" &&
                  <div>
                  <p>{this.state.form.symbol}: {this.state.currentPrices[`${this.state.form.symbol}`]}</p>
                  <button type="button" class="btn btn-success"
                    onClick={() => this.createStock()}
                    style={{margin:"1em"}}>
                    Add that stock to your portfolio</button>
                  </div>
                }
                { this.state.stockStatus=="INVALID" &&
                  <div>
                  <p>Sorry, Can't find that stock. Please enter the correct symbol.</p>
                  </div>
                }
                { this.state.stockStatus=="OLD" &&
                  <div>
                  <p>This stock is already in your portfolio.</p>
                  </div>
                }

                <h3>Portfolio List</h3>
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
                  { this.state.stockList.map((stock, index) => {
                    return(
                      <tr class="table-light" key={ index }>
                        <th scope="row"><a href={`/stock/${ stock.symbol }`}>{ stock.symbol }</a></th>
                        <td>{ stock.average_price }</td>
                        <td>{ stock.total_quantity }</td>
                        <td>{ this.state.currentPrices[`${ stock.symbol }`]}</td>
                        <td>{ this.state.currentPrices[`${ stock.symbol }`] * stock.total_quantity - stock.value }</td>
                        <button type="button" class="btn btn-danger btn-sm"
                          onClick={() => this.handleDelete(`${ stock.id }`)}
                          style={{margin:"1em"}}>
                          Delete</button>
                      </tr>)}
                    )
                  }
                  </tbody>
                </table>
              </div>

        </React.Fragment>
        );
    }
}

export default Portfolio
