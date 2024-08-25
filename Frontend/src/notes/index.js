import React from "react";
import { useOutletContext } from "react-router-dom";
import Greeting from "../components/atoms/greeting";
import Note from "../components/card/note";
import Wrapper from "../hoc/wrapper";
import styles from "./notes.module.scss";

function Notes() {
  const { notesColl = [], focusNoteId, deleteNote, saveNote } = useOutletContext();

  const handleDelete = (id) => {
    deleteNote(id);
  };

  const handleSave = (id, text) => {
    saveNote(id, text);
  };

  return (
    <section className={styles.container}>
      <Greeting />
      <main>
        {notesColl.length > 0 ? (
          notesColl.map((note) => (
            <Note
              key={note._id}
              text={note.text || ""}
              color={note.color || "#ffffff"}
              date={note.createdAt || ""}
              id={note._id}
              onDelete={handleDelete}
              onSave={handleSave}
              isEditing={note._id === focusNoteId}
            />
          ))
        ) : (
          <p>No notes available</p>
        )}
      </main>
    </section>
  );
}

export default Wrapper(Notes);
