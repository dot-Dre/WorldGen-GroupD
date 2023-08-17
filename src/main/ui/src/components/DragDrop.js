import React, { useState, useRef } from "react";
import { PropTypes } from 'prop-types'

import { Box } from "@mui/material";

import dragDrop from "../pages/assets/dragdrop.png";
import "./DragDrop.css";

export const DragDrop = props => {
  const wrapperRef = useRef(null);
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const [file, setFile] = useState(null);

  const onFileDrop = (e) => {
    const dungeonFile = e.target.files[0];
    if (dungeonFile) {
        setFile(dungeonFile)
        props.onFileChange(dungeonFile)
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
        bgcolor: "#776084",
        boxShadow: 500,
        p: 6,
      }}
    >
      <center>
        <Box sx={{width: "30vw"}}>
          <div
            className="drag-drop"
            ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div>
              <img src={dragDrop} alt="placeholder" width={"300vw"} />
              <input type="file" onChange={onFileDrop}/>
              <p style={{ color: "#ffffff" }}>
                Drag and Drop your saved dungeons here
              </p>
            </div>
          </div>
        </Box>
      </center>
    </Box>
  );
};

DragDrop.propTypes = {
    onFileChange: PropTypes.func
}

export default DragDrop;
