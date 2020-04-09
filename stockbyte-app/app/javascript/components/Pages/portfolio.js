import React from "react"
import { Redirect } from "react-router-dom"

class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.state={
            hasPortfolio: false,
            success: false,
            stockList:[]
        }
        this.getPortfolio()
        this.getStockList()
    }
    componentDidMount(){
        this.getPortfolio()
        this.getStockList()
    }
    getPortfolio = () => {
        fetch(`http://localhost:3000/portfolios`)
        .then((response) => {
            if(response.status === 200){
                return(response.json())
            }
        }
        )
    .then((result) => {
        if(result.length === 0){
            this.setState({
                hasPortfolio: true
            })
        }
    })
    }

    createPortfolio = () => {
        return fetch(`http://localhost:3000/portfolios`, {
            body: JSON.stringify({'name': 'default'}),

            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
        .then((response) => {
            if(response.ok){
              this.setState({
                success: true
              })
              return this.getPortfolio()
            }
        })
    }
    // this method retrieve stock list of current_user's default portfolio
    getStockList = () => {
      fetch(`http://localhost:3000/stocks?portfolio=default`)
        .then((response)=>{
          if(response.status === 200){
            return(response.json())
          }
        })
        .then((result)=>{
          this.setState({stockList:result})
        })
      }

    render () {


    return (
        <React.Fragment>
            { this.state.hasPortfolio &&
              <div>
                <p>Do you want to create a portfolio?</p>
                <button onClick={() => this.createPortfolio()}>
                  Create Portfolio
                </button>
              </div>}
            { !this.state.hasPortfolio &&
              <div>
                <h3>Portfolio List</h3>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Symbol</th>
                      <th scope="col">Average Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.stockList.map((stock, index) => {
                    return(
                      <tr class="table-active" key={ index }>
                        <th scope="row"><a href={`/stock/${ stock.symbol }`}>{ stock.symbol }</a></th>
                        <td>{ stock.average_price }</td>
                        <td>{ stock.total_quantity }</td>
                        <td>{ stock.value } </td>
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
