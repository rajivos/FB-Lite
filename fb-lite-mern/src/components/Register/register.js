import React, { useState, Component, useEffect } from 'react';
 import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
 import axios from 'axios';


const useForm = () => {
    const [values, setValues] = useState({});
    const handleChange = e => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
    return {
      values,
      handleChange
    };
  };

const Register = () => {
    const { values, handleChange } = useForm();

    const submitForm =  () => {
      console.log(("executed "));
      console.log("prevented");
    }

    const addMember = () => {
      console.log("adding user")
    }

    const submitFor = (event) =>{
      event.preventDefault()
      console.log("prevented");
    }

    const handleSubmit = e => { 
      e.preventDefault();
      console.log("form submit started")
      const member = {
          email: values.email,
          password: values.password,
          visibility: values.visibility,
          screenName: values.screenName,
          friends: [],
          friendsRequests: [],
          friendsRequested:[]
        }

        console.log(values.visibility)

        axios.post('http://localhost:5000/members/add', member)
    .then(res =>  {
      console.log(res.data)
    }).catch(error =>{
      console.log(error)
    });
      }
  
 
  //   }
    

    return(
    <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form onSubmit={handleSubmit}>
              <p className="h4 text-center mb-4">Register </p>
              <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                Your email
              </label>
              <input
                type="email"
                id="defaultFormRegisterEmailEx"
                className="form-control"
                onChange={handleChange}
                value={values.email}
              />
              <br />
              <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                Your Password
              </label>
              <input
                name="password"
                type="password"
                id="defaultFormLoginPasswordEx"
                className="form-control"
                onChange={handleChange}
                value={values.password}
              />
               <br />
              <label htmlFor="defaultFormScreenNameEx" className="grey-text">
                ScreenName
              </label>
              <input
                name="screenName"
                type="screenName"
                id="defaultFormScreenNameEx"
                className="form-control"
                onChange={handleChange}
                value={values.screenName}
              />
                  <br />
              <label htmlFor="defaultFormRegisterVibilityEx" className="grey-text">
                Your Visibility
              </label>
              <input
                name="visibility"
                type="text"
                id="defaultFormLoginVisibilityEx"
                className="form-control"
                onChange={handleChange}
                value={values.visibility}
              />
              <div className="text-center mt-4">
                <MDBBtn color="indigo"  type="submit">Register</MDBBtn>
              </div>
              </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>);
  };
  
// useEffect(() => {
    //   const interval = setInterval(() => {
    //     setSeconds(seconds + 1);
    //   }, 1000);
    //   return () => clearInterval(interval);
    // }, [seconds]);
  export default Register;