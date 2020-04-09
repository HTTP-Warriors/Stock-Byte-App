import React from "react"
import Flexbox from 'flexbox-react';


class Home extends React.Component {
    render () {

    return (
        <React.Fragment>
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
        </React.Fragment>
        );
    }
}

export default Home
