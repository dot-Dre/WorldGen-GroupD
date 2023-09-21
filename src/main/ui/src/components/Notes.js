import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

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
    height: "10vh",
    marginLeft: "calc((100% - 135%) / 2)",
    marginRight: "calc((100% - 135%) / 2)",
    width: "135%",
    maxWidth: "150%",
    padding: "1.2vh 0px 1.2vh 0px",
  }

  return (
    <div>
      <TextField
        label="Notes"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={notes}
        onChange={handleNotesChange}
        style={notesStyle}
      />
    </div>
  );
};

export default Notes;
