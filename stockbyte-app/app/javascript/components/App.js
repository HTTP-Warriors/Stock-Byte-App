import React from "react"
// import PropTypes from "prop-types"
import 'bootswatch/dist/litera/bootstrap.min.css'
import NavBar from './components/navigationbar'
import Header from "./components/header"
// import Logg from './components/logg_table'
import Overview from "./Pages/overview"
import Portfolio from "./Pages/portfolio"
// import Signin from "./Pages/signin"
// import Signup from "./Pages/signup"
import Stock from "./Pages/stock"
// import Search from "./components/search"
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom"
import NotFound from "./Pages/notfound"


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
      <Router>
        <Switch>
          <Route
          exact path="/" exact component={ Overview }
          />
          <Route
          exact path="/portfolio" exact component={ Portfolio }
          />
          <Route
          exact path="/stock" exact component={ Stock }
          />
          <Route component={ NotFound } />
        </Switch>
      </Router>
      </React.Fragment>
    )
    }
}

export default App
