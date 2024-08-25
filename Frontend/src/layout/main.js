import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../shared/loader";
import Navbar from "../shared/navbar";
import Sidebar from "../shared/sidebar";
import utils from "../utils/localstorage";
import styles from "./layout.module.scss";

function Main() {
  const navigate = useNavigate();
  const [notesColl, setNotesColl] = useState([]);
  const [focusNoteId, setFocusNoteId] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const token = utils.getFromLocalStorage('auth_key');

  useEffect(() => {
    const Authkey = utils.getFromLocalStorage("auth_key");
    if (!Authkey) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/all`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          method: "GET",
        });
        const data = await response.json();
        if (data?.success === 200) {
          setNotesColl(data.data || []);
          setFilteredNotes(data.data || []);
        } else {
          toast.error(data?.message);
        }
      } catch (err) {
        toast.error(`Failed to load notes: ${err}`);
      }
    };

    fetchNotes();
  }, [token]);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    if (searchText) {
      setFilteredNotes(notesColl.filter(note => note.text.toLowerCase().includes(searchText.toLowerCase())));
    } else {
      setFilteredNotes(notesColl);
    }
  };

  const addNote = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/notes`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ text: "" }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success === 200) {
          const newNote = data.data;
          setNotesColl((prevNotes) => [newNote, ...prevNotes]);
          setFilteredNotes((prevNotes) => [newNote, ...prevNotes]);
          setFocusNoteId(newNote._id);
          toast.success("Note added successfully!");
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        toast.error("Note creation failed!");
      });
  };

  const deleteNote = useCallback((id) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/notes`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ id }),
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success === 200) {
          setNotesColl((prevNotes) => prevNotes.filter(note => note._id !== id));
          setFilteredNotes((prevNotes) => prevNotes.filter(note => note._id !== id));
          toast.success("Note deleted successfully!");
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        toast.error("Note delete failed!");
      });
  }, [token]);

  const saveNote = useCallback((id, text) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/notes`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ id, text }),
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success === 200) {
          const updatedNote = data.data;
          setNotesColl((prevNotes) =>
            prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
          );
          setFilteredNotes((prevNotes) =>
            prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
          );
          toast.success("Note saved successfully!");
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        toast.error("Note save failed!");
      });
  }, [token]);
  

  return (
    <>
      <ToastContainer />
      <main className={styles.main}>
        <Suspense fallback={<Loader />}>
          <Sidebar onAddNote={addNote} />
          <div className={styles.container}>
            <Navbar onSearch={handleSearch} searchText={searchText} />
            <section className={styles.content}>
              <Outlet context={{ 
                notesColl: filteredNotes, 
                setNotesColl, 
                focusNoteId,
                deleteNote,
                saveNote,
              }} />
            </section>
          </div>
        </Suspense>
      </main>
    </>
  );
}

export default Main;
