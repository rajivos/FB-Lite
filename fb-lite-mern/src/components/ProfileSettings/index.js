import React, { Fragment, Component, useState } from 'react';
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

const ProfileSettings = () => {
    const { values, handleChange } = useForm();



    const updateProfile = e => { 
      e.preventDefault();
      console.log("Profile Settings started")
      const member = {
          email: values.email,
          password: values.password,
          visibility: values.visibility
        }
        axios.update('http://localhost:5000/members/update', member)
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
            <form onSubmit={updateProfile}>
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
                <MDBBtn color="indigo"  type="submit">Update</MDBBtn>
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
  export default ProfileSettings;