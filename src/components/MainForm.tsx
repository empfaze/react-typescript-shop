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

  // button name
  const [buttonName, setButtonName] = useState("signup");
  const leftButtonName = buttonName === "signup" ? "Sign Up" : "Login";
  const rightButtonName = buttonName === "signup" ? "Login" : "Sign Up";
  function buttonNameHandler() {
    if (buttonName === "signup") setButtonName("login");
    else setButtonName("signup");
  }

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

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    let url;
    if (buttonName === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBm2_AGArJO9rGAtXfjnzRvPZhWqq5cRdY";
      sendToAuth(url, user, handleData);
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBm2_AGArJO9rGAtXfjnzRvPZhWqq5cRdY";
      sendToAuth(url, user, handleData);
    }
  }

  function resetHandler(): void {
    clearEmail();
    clearPassword();
    setFormIsValid(false);
  }
  function errorHandler(): void {
    router.replace('/')
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
          Something went wrong...Please, check the validity of the entered data
          and try again.
          </p>
          <button className={classes['error-btn']} onClick={errorHandler}>Try again</button>
        </>
      )}
      {!isLoading && !error && (
        <form onSubmit={submitHandler} className={classes.form}>
          <div>
            <label htmlFor="email" />
            <input
              type="text"
              id="email"
              placeholder="Email"
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
              type="text"
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
            <div className={classes["left-buttons"]}>
              <button
                type="button"
                className={classes["button-simple"]}
                onClick={resetHandler}
              >
                Clear All
              </button>
              <button
                type="submit"
                className={classes["button-simple"]}
                disabled={!formIsValid}
              >
                {leftButtonName}
              </button>
            </div>
            <button
              type="button"
              className={classes["button-simple"]}
              onClick={buttonNameHandler}
            >
              {rightButtonName}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AuthForm;
