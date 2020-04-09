import React from "react"
import Flexbox from 'flexbox-react';
import background from "./background.jpg"

class Home extends React.Component {
    render () {

    return (
        <React.Fragment>

 
      
      
          <Flexbox flexDirection="column" minHeight="100vh">
            <Flexbox element="header" height="60px">
              
            </Flexbox>

            <Flexbox flexGrow={1}>
            <div class="card mb-3">
                  <h3 class="card-header">Card header</h3>
                  
                  <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <h6 class="card-subtitle text-muted">Support card subtitle</h6>
                    <img src={ background } style={{width:"100%"}} />
                  </div>
                
                
                
                  <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                  
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Cras justo odio</li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                  </ul>
                  
                  <div class="card-body">
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                  </div>
                  

                  
                </div>
                
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                  </div>
                </div>
            </Flexbox>

            <Flexbox element="footer" height="60px">
              
            </Flexbox>
          </Flexbox>
          
            

        </React.Fragment>
        );
    }
}

export default Home
