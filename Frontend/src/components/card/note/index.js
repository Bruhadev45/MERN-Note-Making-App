import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/atoms/button";
import { formatDate } from "../../../utils/formatDate";
import styles from "./note.module.scss";

const Note = forwardRef(({ text, date, id, onDelete, onSave, isEditing }, ref) => {
  const [expand, setExpand] = useState(false);
  const [noteText, setNoteText] = useState(text);
  const [editing, setEditing] = useState(isEditing);
  const [isFirstEdit, setIsFirstEdit] = useState(true);
  const textareaRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusTextarea() {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(noteText.length, noteText.length);
      }
    },
  }));

  const handleEdit = () => {
    setEditing(true);
    if (isFirstEdit && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(noteText.length, noteText.length);
      setIsFirstEdit(false);
    }
  };

  const handleSave = () => {
    if (!noteText.trim().length) {
      toast.error("Note text should not be empty!");
      return;
    }

    onSave(id, noteText);
    setEditing(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    onDelete(id);
  };

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      if (isFirstEdit) {
        textareaRef.current.setSelectionRange(noteText.length, noteText.length);
        setIsFirstEdit(false);
      }
    }
  }, [editing, noteText, isFirstEdit]);

  return (
    <article id={`note-${id}`} className={`${styles.container} ${editing ? styles.editing : ''}`}>
      <div>
        {editing ? (
          <textarea
            ref={textareaRef}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className={styles.textarea}
          />
        ) : (
          <>
            <p className={expand ? styles.expanded : ""}>
              {noteText.substring(0, 154)}
            </p>
            {noteText.length > 154 ? (
              <button onClick={() => setExpand((prev) => !prev)}>
                Read {expand ? "less" : "more"}
              </button>
            ) : null}
          </>
        )}
      </div>
      <footer className={styles.footer}>
        <div>{formatDate(date)}</div>
        {editing ? (
          <Button
            text={"Save"}
            className={styles.saveBtn}
            handleClick={handleSave}
          />
        ) : (
          <Button
            text={"Edit"}
            className={styles.editBtn}
            handleClick={handleEdit}
          />
        )}
        <Button text={"Delete"} className={styles.deleteBtn} handleClick={handleDelete} />
      </footer>
    </article>
  );
});

export default Note;