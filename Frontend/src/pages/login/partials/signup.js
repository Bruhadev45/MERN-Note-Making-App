import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../components/atoms/button";
import Input from "../../../components/atoms/input";
import utils from "../../../utils/localstorage";
import styles from "./partials.module.scss";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email.length || !name.length || !password.length)
      toast.error("some required fields are empty");

    fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success === 201) {
          toast.success("user registered successfully!");

          fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
            method: "POST",
          })
          .then((res) => res.json())
          .then((data) => {
            if (data?.success === 200) {
              toast.success("user login successfully!");
              utils.addToLocalStorage('auth_key', data.token);
              navigate("/notes");
            } else {
              toast.error(data?.message);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("user login failed!");
          });

        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("user registration failed!");
      });
  };

  return (
    <div className={styles.form}>
      <article>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={"Full Name"}
          type={"text"}
        />
        <br />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"Email address"}
          type={"email"}
        />
        <br />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"Password"}
          type={"password"}
        />
      </article>
      <Button
        text={"Join with Email"}
        icon={"material-symbols:login"}
        className={styles.emailbtn}
        handleClick={handleSignup}
      />
    </div>
  );
}

export default Signup;
