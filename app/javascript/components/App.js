import React from "react"
import PropTypes from "prop-types"
import 'bootswatch/dist/litera/bootstrap.min.css'
import Header from "./components/header"
import NavBar from './components/navigationbar'
import Overview from "./Pages/overview"
import Portfolio from "./Pages/portfolio"
import Stock from "./Pages/stock"
import About from "./Pages/about"
import Home from "./Pages/home"
import NotFound from "./Pages/notfound"
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom"
import ReactRailsUJS from 'react_ujs'



class App extends React.Component {


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
      <Header />
      <NavBar
          logged_in = { logged_in }
          sign_in_route = { sign_in_route }
          sign_out_route = { sign_out_route }
          edit_user_route = { edit_user_route }
          />
      <Router>
        <Switch>
          <Route exact path="/about/" component={ About } />
          <Route exact path="/stock/:symbol" render={ (props) => <Stock {...props}/> } />
          <Route exact path="/portfolio/" render={ (props) => <Portfolio /> } />
          <Route exact path="/overview/" render={ (props) => <Overview /> } />
          <Route exact path="/" exact component={ Home } />
          <Route component={ NotFound } />
        </Switch>
      </Router>


    </React.Fragment>
    );
    }
}

export default App;
