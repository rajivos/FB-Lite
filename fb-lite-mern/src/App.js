import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./index.css";
// import MemberProvider from "./components/Contexts/MemberProvider"

// import MembersList from "./components/Home/index";
import HomeContainer from "./components/Home/index";
import ProfileSettings from "./components/ProfileSettings/index";
import LoginContainer from "./components/Login/index";
import RegisterContainer from "./components/Register/index";
import { ProtectedRoute } from "./components/ProtectedRoute"; 



const userDefault = {
  email: "",
  password: '',
  visibility:''

}

function App() {
  return (

    
    <div className="container">

    <Router>
            <Switch>
    {/* <MemberProvider> */}
    {/* <Route exact path="/" component={MembersList} />     */}
    <Route exact path="/login" component={LoginContainer} />    
    <Route exact path="/logout" component={LoginContainer} />    

    <Route exact path="/register" component={RegisterContainer} />    
       
    <ProtectedRoute exact path="/admin"  component={HomeContainer}/>
    {/* <ProtectedRoute exact path="/admin/:id"  component={HomeContainer}/> */}


    {/* </MemberProvider> */}
    <Route path="*" component={()=>"404 error "} />    

    {/* <Route exact path="/members" component={MembersList} /> */}
    {/* <Route path="/edit/:id" component={EditExercise} />
    <Route path="/create" component={CreateExercise} />
    <Route path="/user" component={CreateUser} /> */}

    </Switch>
  </Router>
 </div>
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