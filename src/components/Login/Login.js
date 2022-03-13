import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// useReducer look
//             dispatch new action   (prvState, action)
// const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);

// it do not need any data generate inside component function
// hence it is kept outside of component scope. All the data 
// needed for this reducer function to work will be given to
// it by React automatically.
const emailReducer = (state, action) => {
  console.log("state: ", state, action);
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
  console.log("passwordReducer: ", state, action);
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: '', isValid: false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: true});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: true});

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      console.log('check form validity');
      setFormIsValid(emailIsValid && passwordIsValid);
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
  }, [emailIsValid, passwordIsValid]);
  // checking and updating form validity after every keystroke is another example of we handling
  // side effect of a user action
  // now, we do not want to check form validity after every keystroke (imagine it to be an API call)
  // so, we want to wait until user stops typing then check if input is valid. This is called debouncing.
  // 

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    // setFormIsValid( emailState.isValid && passwordState.isValid);
  };
  // here, as we can see, formIsValid state is dependent upon two other states, and not on
  // its previous state. Hence, in current scenario it might happen that, enteredEmail or
  // enteredPassword themselves were not the latest and gets evaluated to check formValidity
  // this can produce inconsistent results. So, we neither can use function form to update
  // state, nor can we be sure of recentness of depending states. This is where we move from
  // useState to useReducer.

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});
    // setFormIsValid( emailState.isValid && passwordState.isValid);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };
  // also we are individually checking their individual validity too.

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
