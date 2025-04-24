import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null); // NEW

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch("http://localhost:3000/notes");
    const data = await res.json();
    setNotes(data);
  };

  const addNote = async () => {
    if (!title || !content) return;

    if (editId) {
      // UPDATE existing note
      await fetch(`http://localhost:3000/notes/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    } else {
      // CREATE new note
      await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    }

    setTitle("");
    setContent("");
    setEditId(null);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
    });
    fetchNotes();
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  return (
    <div className="container">
      <h1>Notes App</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={addNote}>
          {editId ? "Update Note" : "Add Note"}
        </button>
      </div>

      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note._id}>
            <div>
              <strong>{note.title}</strong>: {note.content}
            </div>
            <div>
              <button onClick={() => editNote(note)}>Edit</button>{" "}
              <button onClick={() => deleteNote(note._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
