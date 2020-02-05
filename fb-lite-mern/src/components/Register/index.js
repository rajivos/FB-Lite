import React, { useState, Component, useEffect, useContext } from "react";
import axios from "axios";
import auth from "../auth";

import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import MemberContext from "../Contexts/MemberContext";

const useForm = () => {
  const [values, setValues] = useState({});

  const handleChange = e => {
    console.log("current state: " + e);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return {
    values,
    handleChange
  };
};

const RegisterContainer = (props) => {
  const [email, setEnteredEmail] = useState("");
  const [password, setEnteredPassword] = useState("");
  const [visibility, setVisibility] = useState("");
  const [screenName, setScreenName] = useState("")
  const [friends, setFriends] = useState([]);
  const [friendReqs, setFriendReqs] = useState([]);


  const [redirect, setRedirect] = useState(false);

  const onChangeEmail = e => {
    setEnteredEmail(e.target.value);
  };


  useEffect(() => {
    // if(!memberTheme.email) {
    //   console.log("Redirect user to Login")

    // }
    // else {
    //   console.log('redirect to admin')
    //   props.history.push("/admin");

    // }
  }, [])

  const onChangePassword = e => {
    setEnteredPassword(e.target.value);
  };

  const onChangeVisibility = e => {
    setVisibility(e.target.value);

  };

  const onChangeScreenName= e => {
    setScreenName(e.target.value);
  };


  const handleSubmit = e => {
    e.preventDefault();
    const member = {
      email: email,
      password: password,
      visibility: visibility,
      screenName: screenName,
      friends:friends,
      friendReqs: friendReqs
    };

    //store variable in global 


    axios
      .post("http://localhost:5000/members/add", member)
      .then(res => {
        if (res.statusText === "OK") {
          console.log("to homePage ");

          auth.login(() => {
            props.history.push("/admin", {memberInfo: res.data});
            })
        }
      })
      .catch(erro => {
        console.log("shoud redirect to register| Details: :" + erro);
      });
    
  };

  //     console.log("form submit started")
  //     const user = {
  //         email: values.email,
  //         enteredPassword: values.password,
  //         visibility: values.visibility
  //       }
  // axios.post('http://localhost:5000/members/add', user)
  //   .then(res =>  {
  //     console.log(res.data)
  //   });
  // this.setState({
  //   email: '',
  //   enteredPassword: '',
  //   visibility: ''
  // })
  //   }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p className="h4 text-center mb-4">Register in</p>
        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="defaultFormRegisterEmailEx"
          className="form-control"
          onChange={onChangeEmail}
          value={email}
        />
        <br />
        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          Password
        </label>
        <input
          name="password"
          type="password"
          id="defaultFormLoginPasswordEx"
          className="form-control"
          onChange={onChangePassword}
          value={password}
        />
          <br />
        <label htmlFor="defaultFormRegisterScreenNameEx" className="grey-text">
          ScreenName
        </label>
        <input
          name="ScreenName"
          type="text"
          id="defaultFormLoginScreenNameEx"
          className="form-control"
          onChange={onChangeScreenName}
          value={screenName}
        />
        <br />
        <label htmlFor="defaultFormRegisterVibilityEx" className="grey-text">
          Visibility
        </label>
        <input
          name="visibility"
          type="text"
          id="defaultFormLoginVisibilityEx"
          className="form-control"
          onChange={onChangeVisibility}
          value={visibility}
        />
        <div className="text-center mt-4">
          <button color="indigo" 
          
          type="submit">
            Register{" "}
          </button>
        </div>
        <a href="/login" >Already a member? Login </a>
      </form>
    </div>
  );
};

export default RegisterContainer;
