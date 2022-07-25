import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../toolkit/login";
import styles from "./LoginSignUp.module.css";
import { showErrorModal } from "../toolkit/error";

function Login(props) {
  const email = useRef("");
  const password = useRef("");
  const dispatch = useDispatch();

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(
          loginUser({
            email: email.current.value,
            password: password.current.value,
            setShowLogin: props.setShowLogin,
            dispatch,
            showErrorModal
          })
        )
      }}
    >
      <p
        className={styles.closeButton}
        onClick={() => props.setShowLogin(false)}
      >
        X
      </p>
      <div>
        <label>Email</label>
        <input ref={email}></input>
      </div>
      <div>
        <label>Password</label>
        <input ref={password}></input>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
