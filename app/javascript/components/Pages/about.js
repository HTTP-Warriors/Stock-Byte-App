import React from "react"
import jeremy from './images/jeremy_photo.jpg'
import Flexbox from 'flexbox-react';

class About extends React.Component {
    render () {
    const aboutus = {
        marginLeft: "auto", 
        marginRight: "auto",
        display:Flexbox.flex,
        flexWrap: Flexbox.wrap
    }

    return (
        <div class="aboutus">
            <h1> Meet our Devs </h1>
            <div class="row">
              <div class="col-sm-6">
              <div class="card mb-3">
                <h3 class="card-header">Card header</h3>
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                </div>
                <img style={{height:"200px", display:"block", marginLeft: "auto", marginRight: "auto"}} src={jeremy} alt="Jeremy's photo for bio" />
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <div class="card-body">
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
                </div>
              </div>
              </div>
              
              <div class="col-sm-6">
              <div class="card mb-3">
                <h3 class="card-header">Card header</h3>
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                </div>
                <img style={{height:"200px", display:"block", marginLeft: "auto", marginRight: "auto"}} src={jeremy} alt="Jeremy's photo for bio" />
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <div class="card-body">
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
                </div>
              </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
              <div class="card mb-3">
                <h3 class="card-header">Card header</h3>
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                </div>
                <img style={{height:"200px", display:"block", marginLeft: "auto", marginRight: "auto"}} src={jeremy} alt="Jeremy's photo for bio" />
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <div class="card-body">
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
                </div>
              </div>
              </div>
              
              <div class="col-sm-6">
              <div class="card mb-3">
                <h3 class="card-header">Card header</h3>
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                </div>
                <img style={{height:"200px", display:"block", marginLeft: "auto", marginRight: "auto"}} src={jeremy} alt="Jeremy's photo for bio" />
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <div class="card-body">
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
                </div>
              </div>
              </div>
            </div>
        </div>
        );
    }
}
export default About
