import React from "react"
import PropTypes from "prop-types"
import 'bootswatch/dist/litera/bootstrap.min.css'
import NavBar from './components/navigationbar'
import Header from "./components/header"
import Logg from './components/logg_table'
import Overview from "./pages/overview"
import Portfolio from "./pages/portfolio"
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import Stock from "./pages/stock"
import Search from "./components/search"
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom"
import NotFound from "./pages/notfound"


class App extends React.Component {
  render () {
    const {
      logged_in,
      sign_in_route,
      sign_out_route
    } = this.props;

    return (
      <React.Fragment>
        <Header />
        <NavBar 
        logged_in = { logged_in }
        sign_in_route = { sign_in_route }
        sign_out_route = { sign_out_route }
      />
      </React.Fragment>
    )
    }
}

export default App

{/* <Router>
  <Switch>       
    <Route component={ NotFound } />
  </Switch>
</Router> */}