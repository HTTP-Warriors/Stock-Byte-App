import React from "react"

class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.state={
            createPortfolio: false,
            
        }
        this.getPortfolio()
    }
    componentDidMount(){
        this.getPortfolio()
    }
    getPortfolio = () => {
        fetch(`https://08894f96464f4cd596494a1683acc75d.vfs.cloud9.us-east-1.amazonaws.com/portfolios`)
        .then((response) => {
            if(response.status === 200){
                return(response.json())
            }
        }
        )
    .then((result) => {
        if(result.length === 0){
            this.setState({
                createPortfolio: true
            })
        }
    })
    }
    createPortfolio = () => {
        return fetch(`https://08894f96464f4cd596494a1683acc75d.vfs.cloud9.us-east-1.amazonaws.com/portfolios`, {
            body: JSON.stringify({'name': 'default'}),
            
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
    render () {

    return (
        <React.Fragment>
            <h2>Portfolio Placeholder</h2>
            {this.state.createPortfolio && <button onClick={() => this.createPortfolio()}> Portfolio Created </button>}
        </React.Fragment>
        );
    }
}

export default Portfolio
