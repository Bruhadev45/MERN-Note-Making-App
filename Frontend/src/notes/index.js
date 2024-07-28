import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import styles from "./notes.module.scss";
import Wrapper from "../hoc/wrapper";
import Greeting from "../components/atoms/greeting";
import Note from "../components/card/note";
import utils from "../utils/localstorage";
import types from "../config/types";


function Notes() {
  const [notesColl, setNotesColl] = useState([]);
  
  useEffect(() => {
    const token = utils.getFromLocalStorage('auth_key');

    fetch( process.env.REACT_APP_API_URL + "/api/notes/all", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setNotesColl(data);
      })
      .catch((err) => {
        toast.error(`Failed to load Notes ${err}`);
      });
  }, []);

  return (
    <section className={styles.container}>
      <Greeting />
      <main>
        {notesColl.map((note, i) => {
          return (
            <Note
              key={note.id}
              text={note.text}
              color={note.color}
              date={note.createdAt}
            />
          );
        })}
      </main>
    </section>
  );
}

export default Wrapper(Notes);



