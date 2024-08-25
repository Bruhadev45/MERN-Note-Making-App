import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import utils from "../../../utils/localstorage";
import styles from "./greeting.module.scss";

function Greeting() {
  const [userName, setUserName] = useState([]);
  
  useEffect(() => {
    const token = utils.getFromLocalStorage('auth_key');

    fetch(`${process.env.REACT_APP_API_URL}/api/auth`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setUserName(res.data.user.name);
      })
      .catch((err) => {
        toast.error(`Failed to load Notes ${err}`);
      });
  }, []);


  return (
    <section className={styles.container}>
      <h2>
        Hello, <span>{userName}</span>
      </h2>
      <p>All your notes are here, in one place!</p>
    </section>
  );
}

export default Greeting;
