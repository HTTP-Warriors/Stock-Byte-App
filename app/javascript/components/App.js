import React from "react"
import NavBar from './components/navigationbar'
import Overview from "./Pages/overview"
import Portfolio from "./Pages/portfolio"
import Playground from "./Pages/playground"
import Stock from "./Pages/stock"
import About from "./Pages/about"
import StockNotFound from "./Pages/stocknotfound"
import Home from "./Pages/home"
import NotFound from "./Pages/notfound"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      defaultPortfolio: []
    }
  }
  componentDidMount(){
      this.getPortfolio()
  }
  // get current_user's portfolio list, if the user is not signed in, defaultPortfolio remains empty; if the user does not have a portfolio, then create a default portfolio.
  getPortfolio = () => {
    fetch(`/portfolios`)
    .then((response) => {
      if(response.status === 200){
          return(response.json())
      }
    })
    .then((result) => {
      if(result.length === 0){
        this.createDefaultPortfolio()
      }else if(result === ["not signed in"]){
        this.setState({
          defaultPortfolio: []
        })
      }else{
        this.setState({
          defaultPortfolio: result
        })
      }
    })
  }
// create the default portfolio
  createDefaultPortfolio = async () => {
    const response = await fetch(`/portfolios`, {
      body: JSON.stringify({ 'name': 'default' }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    if (response.ok) {
      return this.getPortfolio()
    }
  }
  
  render () {
    const {
      logged_in,
      sign_in_route,
      sign_out_route,
      current_user,
      edit_user_route
    } = this.props;
    return (
      <React.Fragment>
        <NavBar
          logged_in = { logged_in }
          sign_in_route = { sign_in_route }
          sign_out_route = { sign_out_route }
          edit_user_route = { edit_user_route }
        />
        <Router>
          <Switch>
            <Route exact path="/about/" component={ About } />
            <Route exact path="/stocknotfound/" component={ StockNotFound } />
            <Route exact path="/stock/:symbol" render={ (props) => <Stock {...props}/> } />
            <Route exact path="/portfolio/" render={ (props) => <Portfolio /> } />
            <Route exact path="/playground/" render={ (props) => <Playground current_user = { current_user } /> } />
            <Route exact path="/overview/" render={ (props) => <Overview /> } />
            <Route exact path="/"  component={ Home } />
            <Route component={ NotFound } />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}
export default App;
