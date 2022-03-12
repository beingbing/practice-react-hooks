import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      console.log('check form validity');
      setFormIsValid( enteredEmail.includes('@') && enteredPassword.trim().length > 6);
    }, 500);

    // useEffect gives us a facility to return a function after successful execution
    // this returned function is called as a cleanup function.
    // it runs as a cleanup process, before the useEffect function runs again the next time.
    // cleanup function doesn't run before the main function only when the main function is
    // ran for the first time, after that for every run of main function, cleanup function
    // is made to run before it.
    // in addition, cleanup function also runs when the component unmounts from the DOM.
    return () => {
      console.log('cleanup!!');
      clearTimeout(timerIdentifier);
    };
  }, [enteredEmail, enteredPassword]);
  // checking and updating form validity after every keystroke is another example of we handling
  // side effect of a user action
  // now, we do not want to check form validity after every keystroke (imagine it to be an API call)
  // so, we want to wait until user stops typing then check if input is valid. This is called debouncing.
  // 

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
