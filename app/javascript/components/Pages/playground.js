import React from "react"

class Playground extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hasPlaygroundAccount: false,
      playgroundAccountData: []
    }
  }
  componentDidMount(){
      this.getPortfolio()
  }

  getPortfolio = () => {
    fetch(`/portfolios`)
    .then((response) => {
      if(response.status === 200){
          return(response.json())
        }
      }
    )
    .then((result) => {
        if(result.length > 1){
          this.setState({
            playgroundAccountData: result[1],
            hasPlaygroundAccount: true
          })
        }
    })
  }
  createPlaygroundAccount = () => {
      return fetch(`/portfolios`, {
          body: JSON.stringify({'name': 'playground', 'cash': 100000.00}),
          headers: {
              "Content-Type": "application/json"
          },
          method: "POST"
      })
      .then((response) => {
          if(response.ok){
            return this.getPortfolio()
          }
      })
  }

  render(){
    const { playgroundAccountData } = this.state
    return(
      <>
        <h1>Playground</h1>
        { !this.state.hasPlaygroundAccount &&
          <div>
            <h4>Are you ready to enter the playground? You will be given $100,000 Virtual Money to start.</h4>
            <button type="button" class="btn btn-primary btn-lg"
              onClick={() => this.createPlaygroundAccount()}>
            Yes
            </button>
          </div>
        }
        { this.state.hasPlaygroundAccount &&
          <div>
            <h4>Account Net Worth: ${ playgroundAccountData.cash }</h4>
          </div>
        }
      </>
    )
  }
}

export default Playground
