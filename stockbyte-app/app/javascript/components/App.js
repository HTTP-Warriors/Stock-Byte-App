import React from "react"
import PropTypes from "prop-types"
import 'bootswatch/dist/litera/bootstrap.min.css'
import NavBar from './components/navigationbar'


class App extends React.Component {


    const {
      logged_in,
      sign_in_route,
      sign_out_route
    } = this.props;
    console.log(this.state.stockList)
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
