import React from "react";
import { ToastContainer } from "react-toastify";
import styles from "./login.module.scss";
import Form from "./section/form";
import Left from "./section/left";

function Login() {
  return (
    <>
      <ToastContainer />
      <main className={styles.container}>
        <Left />
        <Form />
      </main>
    </>
  );
}

export default Login;