import React from "react"


class NavBar extends React.Component {
  render () {

    const {
    logged_in,
    sign_in_route,
    sign_out_route,
    edit_user_route
    } = this.props;

    return(
      <React.Fragment>

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
        </ul>

      </React.Fragment>
    )
  }
}

export default NavBar
