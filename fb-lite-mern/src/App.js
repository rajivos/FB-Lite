import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./index.css";

import MembersList from "./components/Home/index";



function App() {
  return (
    <Router>
    <div className="container">
    <br/>
    <Route path="/members" exact component={MembersList} />

    {/* <Route path="/edit/:id" component={EditExercise} />
    <Route path="/create" component={CreateExercise} />
    <Route path="/user" component={CreateUser} /> */}
    </div>
  </Router>
  );
}

export default App;


/**
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */
      //}


      /*
<React.Fragment>
        <MDBContainer>
            <MDBRow>
            <MDBCol xl="1" lg="2" md="4" sm="6" size="12">xl=1 lg=2 md=4 sm=6 xs=12</MDBCol>
            <MDBCol xl="1" lg="2" md="4" sm="6" size="12">xl=1 lg=2 md=4 sm=6 xs=12</MDBCol>
            <MDBCol xl="1" lg="2" md="4" sm="6" size="12">xl=1 lg=2 md=4 sm=6 xs=12</MDBCol>
            <MDBCol xl="1" lg="2" md="4" sm="6" size="12">xl=1 lg=2 md=4 sm=6 xs=12</MDBCol>
            <MDBCol xl="1" lg="2" md="4" sm="6" size="12">xl=1 lg=2 md=4 sm=6 xs=12</MDBCol>
            <MDBCol xl="1" lg="2" md="4" sm="6" size="12">xl=1 lg=2 md=4 sm=6 xs=12</MDBCol>
            <MDBCol xl="1" lg="2" md="4" sm="6" size="12">xl=1 lg=2 md=4 sm=6 xs=12</MDBCol>
            <MDBCol xl="1" lg="2" md="4" sm="6" size="12">xl=1 lg=2 md=4 sm=6 xs=12</MDBCol>
            <MDBCol xl="1" lg="2" md="4" sm="6" size="12">xl=1 lg=2 md=4 sm=6 xs=12</MDBCol>
            <MDBCol xl="1" lg="2" md="4" sm="6" size="12">xl=1 lg=2 md=4 sm=6 xs=12</MDBCol>
            <MDBCol xl="1" lg="2" md="4" sm="6" size="12">xl=1 lg=2 md=4 sm=6 xs=12</MDBCol>
            <MDBCol xl="1" lg="2" md="4" sm="6" size="12">xl=1 lg=2 md=4 sm=6 xs=12</MDBCol>
        </MDBRow>
        </MDBContainer>
        </React.Fragment>
      */