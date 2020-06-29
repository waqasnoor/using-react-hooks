import React, { useState, useEffect, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import ConfigContext from "./ConfigContext";

const SignMeUp = ({ signupCallback }) => {
  useEffect(() => {
    console.log(`SignMeUp:useEffect called`);
  });
  const { context, setContext } = useContext(ConfigContext);

  const [email, setEmail] = useState();
  const [emailValid, setEmailValid] = useState(false);
  const [sendProcessing, setSendProcessing] = useState(false);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const notify = () => {
    toast.info(`You will be notified of upcoming events ${email}`);
  };

  function sendEmailToBackend() {
    setSendProcessing(true);
    new Promise(function (resolve) {
      setTimeout(function () {
        setContext({ ...context, loggedInUser: email });
        setSendProcessing(false);
        setEmail("");
        resolve();
      }, 1000);
    }).then(() => {
      notify();
      signupCallback(email);
      setEmail("");
    });
  }

  function Logout() {
    setSendProcessing(true);
    new Promise(function (resolve) {
      setTimeout(function () {
        setContext({ ...context, loggedInUser: "" });
        setSendProcessing(false);
        resolve();
      }, 1000);
    }).then(() => {
      // notify();
      signupCallback(email);
      setEmail("");
    });
  }
  const buttonText = sendProcessing ? "processing..." : "Login";

  //console.log("src/SignMeUp called");
  if (context.loggedInUser) {
    return (
      <div className="container">
        <div className="content">
          <span>Logged in user {context.loggedInUser}</span> &nbsp; &nbsp;
          <button className="btn" onClick={Logout} type="submit">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return context.showSignup ? (
    <div className="container">
      <div>
        <ToastContainer />
        <div className="content">
          <input
            value={email}
            onChange={(e) => {
              setEmailValid(validateEmail(e.target.value));
              return setEmail(e.target.value);
            }}
            placeholder="Enter Email"
            type="email"
            name="email"
            required
            required
          />
          &nbsp;
          <button
            disabled={!emailValid || sendProcessing}
            className="btn"
            onClick={sendEmailToBackend}
            type="submit"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default SignMeUp;
