import React from "react"
import  { Redirect } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.state={
      success: false,
      form:{
        symbol:""
      }
    }

  }

  handleSubmit = (event) => {
      event.preventDefault()
      let { form } = this.state
      window.location.href = `/stock/${form.symbol}`
  }

  handleChange = (event) => {
      let { form } = this.state
      form[event.target.name] = event.target.value
      this.setState({ form: form})
  }



  render () {

    const {
    logged_in,
    sign_in_route,
    sign_out_route,
    edit_user_route
    } = this.props;

    return(
      <React.Fragment>


    <nav class="navbar navbar-inverse">
      <div class="container-fluid">

        </div>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="/overview">Overview</a>
          </li>
          {logged_in &&
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="/portfolio">Portfolio</a>
            </li>}
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="/about">About</a>
          </li>
          {logged_in &&
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href={ edit_user_route }>Account</a>
            </li>}
          {logged_in &&
            <li class="nav-item">
              <a class href={sign_out_route}>Sign Out</a>
            </li>}
          {!logged_in &&
            <li class="nav-item">
              <a class href={sign_in_route}>Sign In</a>
            </li>}

          <form>
          <li>
            <input onChange = { this.handleChange } type="text" placeholder="Stock Search" name="symbol" />

            <button type="submit" onClick = { this.handleSubmit }>Find</button>
          </li>
          </form>
        </ul>
      </nav>



      </React.Fragment>
    )
  }
}

export default NavBar
