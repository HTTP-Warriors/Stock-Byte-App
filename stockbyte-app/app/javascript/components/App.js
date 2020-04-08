import React from "react"
import PropTypes from "prop-types"
import 'bootswatch/dist/litera/bootstrap.min.css'
// import './application.css '
import NavBar from './components/navigationbar'
import Logg from './components/logg_table'

class App extends React.Component {
  render () {

     

    const {
      logged_in,
      sign_in_route,
      sign_out_route
    } = this.props;

    return (
      

      
      <React.Fragment>
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
