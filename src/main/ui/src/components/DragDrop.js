import React, { useState, useRef } from "react";
import { PropTypes } from "prop-types";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFile } from "../slices/fileSlice";
import { FileParser } from "../util/FileParser";
import { ourPalette } from "../Theme";

import dragDrop from "./dragdrop.png";
import * as BiIcons from "react-icons/bs";
import LinearProgress from "@mui/material/LinearProgress";
import "./DragDrop.css";

export const DragDrop = (props) => {
  const wrapperRef = useRef(null);
  const navigateToView = useNavigate();
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const [displayMessage, setDisplayMessage] = useState(
    "Drag & Drop your Dungeon file"
  );

  const [progress, setProgress] = useState(0);
  const [barColor, setBarColor] = useState("secondary");

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const dispatch = useDispatch();

  const handleButtonClicked = () => {
    navigateToView("/DMView");
  };

  const onFileDrop = (e) => {
    const dungeonFile = e.target.files[0];

    if (dungeonFile) {
      if (dungeonFile.name.endsWith(".json")) {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            const fileContent = event.target.result;
            const parsedContent = JSON.parse(fileContent);
            console.log(parsedContent);
            dispatch(setFile(parsedContent));
            setBarColor("secondary");
            setDisplayMessage("Good to go!");
            setProgress(100);
            setButtonDisabled(false);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            setBarColor("tertiary");
            setDisplayMessage("Error parsing JSON");
            setButtonDisabled(false);
          }
        };

        reader.readAsText(dungeonFile); // Start reading the file as text
      } else {
        setBarColor("tertiary");
        setDisplayMessage("Please use a .json");
        setButtonDisabled(false);
      }
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        backgroundImage: ourPalette.tabGradient,
        borderRadius: "2px",
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
              {/* <img src={dragDrop} alt="" className="dd-image" /> */}
              <BiIcons.BsFiletypeJson style={{width:"100%", height:"100%", color:ourPalette.white}}/>
              <h3 style={{ color: "white", paddingTop:"10%", fontFamily:"monospace" }}>{displayMessage}</h3>
            </div>
            <input type="file" value="" onChange={onFileDrop} />
          </div>
          <LinearProgress
            variant="determinate"
            value={progress}
            className="progress-bar"
            color={barColor}
          />
        </Box>
        <Button
          variant="outlined"
          className="go"
          onClick={handleButtonClicked}
          disabled={buttonDisabled}
          color={barColor}
        >
          Start Game
        </Button>
      </center>
    </Box>
  );
};

DragDrop.propTypes = {
  onFileChange: PropTypes.func,
};

export default DragDrop;
