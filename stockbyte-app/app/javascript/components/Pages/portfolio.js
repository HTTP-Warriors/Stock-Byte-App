import React from "react"
import { Redirect } from "react-router-dom"

class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.state={
            hasPortfolio: false,
            success: false,
            stockList:[],
            form: {
                symbol: ""
            }
        }
        this.getPortfolio()
        this.getStockList()
    }
    componentDidMount(){
        this.getPortfolio()
        this.getStockList()
    }
    getPortfolio = () => {
        fetch(`https://08894f96464f4cd596494a1683acc75d.vfs.cloud9.us-east-1.amazonaws.com/portfolios`)
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
        return fetch(`https://08894f96464f4cd596494a1683acc75d.vfs.cloud9.us-east-1.amazonaws.com/portfolios`, {
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
      fetch(`https://08894f96464f4cd596494a1683acc75d.vfs.cloud9.us-east-1.amazonaws.com/stocks?portfolio=default`)
        .then((response)=>{
          if(response.status === 200){
            return(response.json())
          }
        })
        .then((result)=>{
          this.setState({stockList:result})
        })
      }
    handleSubmit = (event) => {
        event.preventDefault()
        this.createStock(this.state.form)
        console.log(this.state.form.symbol)
    }
    
    handleChange = (event) => {
        let { form } = this.state
        form[event.target.name] = event.target.value
        this.setState({ form: form})
        console.log(this.state.form.symbol)
    }
    createStock = (form) => {
        return fetch(`https://08894f96464f4cd596494a1683acc75d.vfs.cloud9.us-east-1.amazonaws.com/stocks?portfolio=default`, {
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
              { this.state.success && <Redirect to="./overview"/>}
            { !this.state.hasPortfolio &&
              <div>
                <div class="form-group">
                    <label class="col-form-label" for="inputDefault">Default input</label>
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
