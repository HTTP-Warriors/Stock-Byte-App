import React from "react"
import jeremy from './images/jeremy_photo.jpg'
import linkedin from './images/linkedin.png'
import github from './images/github.png'
import Flexbox from 'flexbox-react';

class About extends React.Component {
    render () {
    return (
      <div class="container" style={{textAlign: "center"}}>
            <h1 style={{paddingBottom: "20px", textAlign: "center"}}> Meet the Devs </h1>
            <div class="row" style={{marginLeft: "auto", marginRight: "auto"}}>
              <div class="col-sm-6">
                <div class="card mb-5">
                  <h3 class="card-header">Jeremy Lleva</h3>
                  <div class="card-body">
                    <h5 class="card-title">Application Title</h5>
                  </div>
                  <img style={{height:"200px", display:"block", marginLeft: "auto", marginRight: "auto", borderRadius:"5px"}} src={jeremy} alt="Jeremy's photo for bio" />
                  <div class="card-body">
                    <p class="card-text">Quick description of self</p>
                  </div>
                  <div class="card-body">
                    <a href="#" class="card-link" > <img style={{height: "20px", width: "20px"}} src={linkedin} alt= "Linkedin" /> </a>
                    <a href="#" class="card-link"> <img style={{height: "20px", width: "20px"}} src={github} alt= "Linkedin" /> </a>
                  </div>
                </div>
              </div>
              
              <div class="col-sm-6">
              <div class="card mb-5">
                <h3 class="card-header">Card header</h3>
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                </div>
                <img style={{height:"200px", display:"block", marginLeft: "auto", marginRight: "auto"}} src={jeremy} alt="Jeremy's photo for bio" />
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                  <div class="card-body">
                    <a href="#" class="card-link" > <img style={{height: "20px", width: "20px"}} src={linkedin} alt= "Linkedin" /> </a>
                    <a href="#" class="card-link"> <img style={{height: "20px", width: "20px"}} src={github} alt= "Linkedin" /> </a>
                  </div>
              </div>
              </div>
            </div>
            
            <div class="row" style={{marginLeft: "auto", marginRight: "auto"}}>
              <div class="col-sm-6" >
              <div class="card mb-5">
                <h3 class="card-header">Card header</h3>
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                </div>
                <img style={{height:"200px", display:"block", marginLeft: "auto", marginRight: "auto"}} src={jeremy} alt="Jeremy's photo for bio" />
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                  <div class="card-body">
                    <a href="#" class="card-link" > <img style={{height: "20px", width: "20px"}} src={linkedin} alt= "Linkedin" /> </a>
                    <a href="#" class="card-link"> <img style={{height: "20px", width: "20px"}} src={github} alt= "Linkedin" /> </a>
                  </div>
              </div>
              </div>
              
              <div class="col-sm-6">
              <div class="card mb-5">
                <h3 class="card-header">Card header</h3>
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                </div>
                <img style={{height:"200px", display:"block", marginLeft: "auto", marginRight: "auto"}} src={jeremy} alt="Jeremy's photo for bio" />
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                  <div class="card-body">
                    <a href="#" class="card-link" > <img style={{height: "20px", width: "20px"}} src={linkedin} alt= "Linkedin" /> </a>
                    <a href="#" class="card-link"> <img style={{height: "20px", width: "20px"}} src={github} alt= "Linkedin" /> </a>
                  </div>
              </div>
              </div>
            </div>
          </div>
        );
    }
}
export default About
