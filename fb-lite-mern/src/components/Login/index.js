import React, { useState, useContext } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import auth from "../auth";

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

const LoginContainer = props => {
  const [email, setEnteredEmail] = useState("");
  const [password, setEnteredPassword] = useState("");
  const [memberInfo, setMemberInfo] = useState("");


  const onChangeEmail = e => {
    setEnteredEmail(e.target.value);
  };

  const onChangePassword = e => {
    setEnteredPassword(e.target.value);
  };

  const { values, handleChange } = useForm();

  const handleSubmit = e => {
    e.preventDefault();
    var found = false;
    var objId = false;
    const guest = {
      email: email,
      password: password
    };

    axios.get("http://localhost:5000/members/", guest)
      .then(res => {
        const members = res.data;
        for (var i = 0; i < members.length; i++) {
             if (members[i].email == email){
              console.log("email query match found "+members[i].email)
              console.log(members[i])
              if (members[i].password == password){
                console.log("password query match found "+members[i].email)
                return auth.login(() => {
                return props.history.push("/admin", { memberInfo: members[i] });
              });
            }
              break;
             }
        }
      })
      // .then((res) => {
      //   if (found) {
      //     return auth.login(() => {
      //       return props.history.push("/admin", { memberInfo: objId });
      //     });
      //   }
      // })
    setEnteredEmail("");
    setEnteredPassword("");
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p className="h4 text-center mb-4">Sign in</p>
        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
          Your email
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
          Your Password
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
        <div className="text-center mt-4">
          <button color="indigo" type="submit">
            Login{" "}
          </button>
          <br></br>
          <a href="/register">Register Here! </a>
        </div>
      </form>
    </div>
  );
};

export default LoginContainer;
