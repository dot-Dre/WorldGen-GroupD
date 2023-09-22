import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { ourPalette } from "../Theme";

const Notes = () => {
  const [notes, setNotes] = useState("");

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to localStorage whenever the 'notes' state changes
  useEffect(() => {
    localStorage.setItem("notes", notes);
  }, [notes]);

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const notesStyle = {
    // height: "10vh",
    marginLeft: "calc((100% - 135%) / 2)",
    marginRight: "calc((100% - 135%) / 2)",
    width: "135%",
    maxWidth: "150%",
    marginTop: "10%",
    // padding: "1.2vh 0px 1.2vh 0px",
    backgroundColor: "#27252b",
    borderRadius: "2px",
    color:ourPalette.white,
  }

  return (
    <div>
      <TextField
        label="Notes"
        multiline
        rows={4}
        variant="filled"
        fullWidth
        value={notes}
        onChange={handleNotesChange}
        style={notesStyle}
        InputProps={{
          style: { color: ourPalette.white, fontFamily: 'Courier New, monospace', fontSize: '90%' }
        }}
      />
    </div>
  );
};

export default Notes;
