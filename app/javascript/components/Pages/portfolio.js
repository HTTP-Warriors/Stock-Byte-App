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
            currentPrices:{}
        }
        this.getStockList()
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

    handleSubmit = (event) => {
        event.preventDefault()
        this.createStock(this.state.form)
    }

    handleChange = (event) => {
        let { form } = this.state
        form[event.target.name] = event.target.value
        this.setState({ form: form})
    }

    createStock = (form) => {
        this.getCurrentPrice(form.symbol)
        const { currentPrices } = this.state
        if(currentPrices[`${form.symbol}`]){
        return fetch(`/stocks?portfolio=default`, {
            body: JSON.stringify(form),
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
    }

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

            { !this.state.hasPortfolio &&
              <div>
                <div class="form-group">
                    <label class="col-form-label" for="inputDefault">Add a stock</label>
                    <input onChange={ this.handleChange } type="text" class="form-control" name="symbol"/>
                    <button type="submit" onClick= { this.handleSubmit }>Submit</button>
                </div>
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
          }
        </React.Fragment>
        );
    }
}

export default Portfolio
