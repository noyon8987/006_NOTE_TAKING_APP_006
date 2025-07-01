import { useState } from "react";
import "./style.css";

export default function App() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteList, setNoteList] = useState([
    { id: 1, title: "Note 1" },
    { id: 2, title: "Note 2" },
  ]);
  const [editMode, seteditMode] = useState(false);
  const [editableNote, setEditableNote] = useState(null);

  const handleNoteChange = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    if (noteTitle.trim() === "") {
      return alert(`Please provide a valid title`);
    }

    editMode ? updateNoteHandler() : createNoteHandler();
  };

  const createNoteHandler = () => {
    const newTitle = {
      id: Date.now() + "",
      title: noteTitle,
    };

    setNoteList([...noteList, newTitle]);
    setNoteTitle("");
  };

  const updateNoteHandler = () => {
    const updateNote = noteList.map((item) => {
      if (item.id === editableNote.id) {
        return { ...item, title: noteTitle };
      }
      return item;
    });
    setNoteList(updateNote);
    seteditMode(false);
    setNoteTitle("");
  };

  const handleRemoveTitle = (noteId) => {
    setNoteList(noteList.filter((note) => note.id !== noteId));
  };

  const handleEditTitle = (note) => {
    seteditMode(true);
    setEditableNote(note);
    setNoteTitle(note.title);
  };

  return (
    <>
      <form>
        <input type="text" value={noteTitle} onChange={handleNoteChange} />
        <button type="submit" onClick={handleTitleSubmit}>
          {editMode ? "Update Note" : "Add Note"}
        </button>
      </form>
      <div className="note_list">
        <ul>
          {noteList.map((note) => {
            return (
              <>
                <li key={note.id}>
                  <span>{note.title}</span>
                  <button onClick={() => handleEditTitle(note)}>Edit</button>
                  <button onClick={() => handleRemoveTitle(note.id)}>
                    Delete
                  </button>
                </li>
                <br />
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}
