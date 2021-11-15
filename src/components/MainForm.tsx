import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";

import useInput from "../hooks/useInput";
import useHttp from "../hooks/useHttp";

import classes from "./styles/MainForm.module.css";
import Spinner from "./UI/Spinner";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { authActions } from "../store/slices/auth";

// validation functions
function validateEmail(str: string) {
  return str.trim().includes("@");
}
function validatePassword(str: string) {
  return str.trim().length > 6;
}

const AuthForm: FC = () => {
  const router = useHistory();
  const dispatch = useTypedDispatch();

  const { isLoading, error, sendRequest: sendToAuth } = useHttp();

  // input reducers
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: clearEmail,
  } = useInput(validateEmail);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: clearPassword,
  } = useInput(validatePassword);

  // form state
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (emailIsValid && passwordIsValid) setFormIsValid(true);
    else setFormIsValid(false);
  }, [emailIsValid, passwordIsValid]);

  // handling recieved data from firebase
  function handleData(obj: any) {
    console.log(obj);
    const { idToken, expiresIn } = obj;
    const transformedData = {
      jwtToken: idToken,
      expTime: expiresIn,
    };

    // storing data into local storage
    localStorage.setItem("token", idToken);
    localStorage.setItem("expirationTime", expiresIn);

    // storing auth data in state
    dispatch(authActions.login(transformedData));

    router.replace("/main/messenger-bags");
  }

  let type: string;
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formIsValid) {
      const user = {
        email: email,
        password: password,
      };

      let url;
      if (type === "signup") {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBm2_AGArJO9rGAtXfjnzRvPZhWqq5cRdY";
        sendToAuth(url, user, handleData);
      } else if (type === "login") {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBm2_AGArJO9rGAtXfjnzRvPZhWqq5cRdY";
        sendToAuth(url, user, handleData);
      }
    }
  }
  function signUpHandler() {
    type = "signup";
  }
  function loginHandler() {
    type = "login";
  }

  function resetHandler(): void {
    clearEmail();
    clearPassword();
    setFormIsValid(false);
  }
  function errorHandler(): void {
    router.replace("/");
  }

  // para classes definition
  const emailParaInvalid = emailHasError
    ? classes["para-invalid-visible"]
    : classes["para-invalid-invisible"];
  const passwordParaInvalid = passwordHasError
    ? classes["para-invalid-visible"]
    : classes["para-invalid-invisible"];

  // input classes definition
  const emailInputInvalid = emailHasError ? classes.invalid : "";
  const passwordInputInvalid = passwordHasError ? classes.invalid : "";

  return (
    <>
      {isLoading && <Spinner />}
      {error && (
        <>
          <p className={classes.error}>
            Something went wrong...<br />Please, check the validity of the entered
            data and try again.
          </p>
          <button className={classes["error-btn"]} onClick={errorHandler}>
            Try again
          </button>
        </>
      )}
      {!isLoading && !error && (
        <form onSubmit={submitHandler} className={classes.form}>
          <div>
            <label htmlFor="email" />
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              className={emailInputInvalid}
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            <p className={emailParaInvalid}>
              Email adress must contain "@" symbol.
            </p>
          </div>
          <div>
            <label htmlFor="password" />
            <input
              type="password"
              id="password"
              placeholder="Password (min 7 chars)"
              className={passwordInputInvalid}
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            <p className={passwordParaInvalid}>
              Password must be at least 7 characters long.
            </p>
          </div>
          <div className={classes["button-wrapper"]}>
            <button
              type="button"
              className={classes["button-simple"]}
              onClick={resetHandler}
            >
              Clear All
            </button>
            <div className={classes["left-buttons"]}>
              <button
                type="submit"
                className={classes["button-signup"]}
                onClick={signUpHandler}
              >
                Sign Up
              </button>
              <button
                type="submit"
                className={classes["button-simple"]}
                onClick={loginHandler}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default AuthForm;
