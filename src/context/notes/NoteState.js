import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const n1 = [];
  const [notes, setNotes] = useState(n1);

  //Get all notes
  const getNotes = async () => {
    // API Call
    // cd bacend - npm install cors
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMmZjNzBlZGNkMjg1YzVkYTMyZGJlIn0sImlhdCI6MTcwOTM3NDU5M30.m04qI69za65Eva4kJtMydwtWBnekUvRsAktG8arm5Bw",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //add
  const addNote = async (title, description, tag) => {
    // API Call
    // cd bacend - npm install cors
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMmZjNzBlZGNkMjg1YzVkYTMyZGJlIn0sImlhdCI6MTcwOTM3NDU5M30.m04qI69za65Eva4kJtMydwtWBnekUvRsAktG8arm5Bw",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //delete
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMmZjNzBlZGNkMjg1YzVkYTMyZGJlIn0sImlhdCI6MTcwOTM3NDU5M30.m04qI69za65Eva4kJtMydwtWBnekUvRsAktG8arm5Bw",
      },
    });
    const json = response.json();
    console.log(json);

    console.log("Deleted " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMmZjNzBlZGNkMjg1YzVkYTMyZGJlIn0sImlhdCI6MTcwOTM3NDU5M30.m04qI69za65Eva4kJtMydwtWBnekUvRsAktG8arm5Bw",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic to edit in client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
