import React from "react"
import PropTypes from "prop-types"
import 'bootswatch/dist/litera/bootstrap.min.css'
import NavBar from './components/navigationbar'
import Header from "./components/header"
import Overview from "./Pages/overview"
import Portfolio from "./Pages/portfolio"
// import Signin from "./Pages/signin"
// import Signup from "./Pages/signup"
import Stock from "./Pages/stock"
// import Search from "./components/search"
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom"
import NotFound from "./Pages/notfound"
import Cards from './components/cards'
import image1 from './components/image1.png'
import Flexbox from 'flexbox-react';
import ReactRailsUJS from 'react_ujs'
// import background from './components/background.jpg'


class App extends React.Component {
  render () {
    const {
      logged_in,
      sign_in_route,
      sign_out_route
    } = this.props;
    return (

     <React.Fragment>
     <div  className="container">

     <img src= { image1 } alt="Card Icon" style={{width: "100%", height:"100%"}} />
      <NavBar
          logged_in = { logged_in }
          sign_in_route = { sign_in_route }
          sign_out_route = { sign_out_route }/>
      <Cards />
              <Flexbox flexDirection="column" minHeight="100vh">

              <Flexbox element="header" height="60px">
                Header
              </Flexbox>

              <Flexbox flexGrow={1}>

              </Flexbox>

              <Flexbox element="footer" height="60px">
                Footer
              </Flexbox>

            </Flexbox>

      </div>
    </React.Fragment>
    );
    }
}

export default App;
