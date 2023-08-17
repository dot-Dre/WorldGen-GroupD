import React, { useState, useRef } from "react";
import { PropTypes } from "prop-types";
import { Box } from "@mui/material";

import dragDrop from "../pages/assets/dragdrop.png";
import LinearProgress from "@mui/material/LinearProgress";
import "./DragDrop.css";

export const DragDrop = (props) => {
  const wrapperRef = useRef(null);
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const [file, setFile] = useState(null);
  const [displayMessage, setDisplayMessage] = useState("Drag & Drop your Dungeon file");

  const [progress, setProgress] = useState(0);
  const [barColor, setBarColor] = useState("secondary");

  const onFileDrop = (e) => {
    const dungeonFile = e.target.files[0];

    if (dungeonFile) {
      if (dungeonFile.name.endsWith('.json')) {
        setBarColor("secondary")
        setDisplayMessage("Good to go!")
        setProgress(100)
        setFile(dungeonFile);
        props.onFileChange(dungeonFile)
      } else {
        setBarColor("tertiary")
        setDisplayMessage("Please use a .json")
      }
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        backgroundImage: "linear-gradient(#781da8, #4a285c, #211f26)",
        borderRadius: "20px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "30vw",
        height: "50vh",
        bgcolor: "#776084",
        boxShadow: 500,
        p: 6,
      }}
    >
      <center>
        <Box sx={{ width: "30vw" }}>
        <div
                ref={wrapperRef}
                className="drag-drop"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={dragDrop} alt="" className="dd-image"/>
                    <h3 style={{color:"white"}}>{displayMessage}</h3>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
          <LinearProgress variant="determinate" value={progress} className="progress-bar" color={barColor}/>
        </Box>
      </center>
    </Box>
  );
};

DragDrop.propTypes = {
  onFileChange: PropTypes.func,
};

export default DragDrop;
