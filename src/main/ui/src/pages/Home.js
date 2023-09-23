import React, { useState } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Modal } from "@mui/material";
import { SplitScreen } from "../components/SplitScreen";
import { DragDrop } from "../components/DragDrop";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";
import { motion } from "framer-motion";
import * as BiIcons from "react-icons/bi";
import { ourPalette } from "../Theme";
import {
  HomeBody,
  LogoStyles,
  EnterIDStyles,
  CodeFieldStyles,
  EnterHelpStyles,
  RocketButtonStyles,
  GenerateTextStyles,
  CreateButtonStyles,
  CreateButtonTextStyles,
  LoadTextStyles,
  LoadButtonStyles,
  LoadButtonTextStyles,
  DescriptionTextStyles,
  LeftImageStyles,
} from "./HomeStyle";

// import "./Home.css"; // No longer using this, using component style or sx props
import logo from "./assets/logo.png";
import gen from "./assets/gen.gif";

/**
 * This function returns the Home page component. This page
 * serves as a bridge for users of the application to enter a running game,
 * or generate a new map and host a new game off a newly
 * generated map.
 *
 * @returns This function returns the Home page component.
 */
export const Home = () => {
  // Navigation hooks
  const navigateToGenerate = useNavigate();
  const navigateToView = useNavigate();

  // Hover state constants
  const [loadButtonColor, setLoadButtonColor] = useState("primary");
  const [createButtonColor, setCreateButtonColor] = useState("primary");
  const [goButtonColor, setGoButtonColor] = useState("primary");

  // These will render different help texts
  const [isLoadButtonHovered, setIsLoadButtonHovered] = useState(false);
  const [isGenerateButtonHovered, setIsGenerateButtonHovered] = useState(false);

  // Modal code
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Code to Handle file drag drop events . . . extend functionality here, currently does not save to local browser
  const [file, setFile] = useState(null);
  const onFileChange = (file) => {
    setFile(file);
    // localStorage.setItem('dungeonFile', file)
  };

  // Code to Handle gamecode text field changes . . . extend functionality here
  const [gameCode, setGameCode] = useState(""); // Initialize gameCode as an empty string
  const [inputError, setInputError] = useState(false);

  const handleGameCodeChange = (event) => {
    const inputValue = event.target.value;
    setGameCode(inputValue);
    setInputError(inputValue.length !== 9 || !/^\d+$/.test(inputValue));
  };

  return (
    <body style={HomeBody}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ThemeProvider theme={theme}>
          <SplitScreen leftSpace={2} rightSpace={1.5}>
            <Container height="100vh">
              <img src={logo} alt="crashed" style={LogoStyles} />
              <div>
                <h2 style={EnterIDStyles}>Enter A Game ID</h2>
                <TextField
                  sx={CodeFieldStyles}
                  label="9-digit Code"
                  variant="filled"
                  color="secondary"
                  autoFocus="True"
                  value={gameCode} // Set value to gameCode
                  onChange={handleGameCodeChange} // Add onChange handler
                  error={inputError} // Show error state
                />
                <Button
                  sx={RocketButtonStyles}
                  variant="outlined"
                  size="small"
                  color={goButtonColor}
                  disabled={inputError}
                  onClick={() => {
                    if (gameCode.length !== 9 || !/^\d+$/.test(gameCode)) {
                      setInputError(true);
                    } else {
                      setInputError(false);
                      navigateToView("/PlayerDetails");
                    }
                  }}
                  onMouseEnter={() => {
                    setGoButtonColor("secondary");
                  }}
                  onMouseLeave={() => {
                    setGoButtonColor("primary");
                  }}
                >
                  <Typography variant="body1">
                    {/* Go! */}
                    <BiIcons.BiSolidRocket />
                  </Typography>
                </Button>
              </div>
              {inputError ? (
                <p style={EnterHelpStyles}>
                  Your game code isn't formatted correctly!
                </p>
              ) : (
                <p style={EnterHelpStyles}>e.g 143344561</p>
              )}
              <div>
                <h3 style={GenerateTextStyles}>Generate A Dungeon!</h3>
                <Button
                  variant="outlined"
                  size="small"
                  color={createButtonColor}
                  onClick={() => navigateToGenerate("/Generate")}
                  onMouseEnter={() => {
                    setIsGenerateButtonHovered(true);
                    setCreateButtonColor("secondary");
                  }}
                  onMouseLeave={() => {
                    setIsGenerateButtonHovered(false);
                    setCreateButtonColor("primary");
                  }}
                  style={CreateButtonStyles}
                >
                  <Typography
                    variant="body1"
                    sx={CreateButtonTextStyles}
                  >
                    Create Dungeon
                  </Typography>
                </Button>
                <h3
                  style={LoadTextStyles}
                >
                  Load A Previously Generated Dungeon!
                </h3>
                <Button
                  variant="outlined"
                  color={loadButtonColor}
                  size="small"
                  onMouseEnter={() => {
                    setIsLoadButtonHovered(true);
                    setLoadButtonColor("secondary");
                  }}
                  onMouseLeave={() => {
                    setIsLoadButtonHovered(false);
                    setLoadButtonColor("primary");
                  }}
                  onClick={handleOpen}
                  style={LoadButtonStyles}
                >
                  <Typography
                    variant="body1"
                    sx={LoadButtonTextStyles}
                  >
                    Load Dungeon
                  </Typography>
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <DragDrop onFileChange={(files) => onFileChange(files)} />
                </Modal>
              </div>
              <div>
                <p
                  style={DescriptionTextStyles}
                >
                  {isLoadButtonHovered
                    ? 'Rediscover history with the "Load" button. Revisit a curated Dungeons & Dragons adventure, where challenges and treasures await from previous explorers. Relive the experience, uncovering the tales etched into this pre-generated world.'
                    : isGenerateButtonHovered
                    ? 'Unleash terror with the "Generate" button. Dive into a chilling Dungeons & Dragons adventure where every corridor holds dread, creatures lurk in darkness, and traps test your mettle. Embark on a journey that melds horror and strategy, as you navigate a procedurally crafted nightmare.'
                    : ""}
                </p>
              </div>
            </Container>
            <img
              src={gen}
              alt="crashed"
              style={LeftImageStyles}
            />
          </SplitScreen>
        </ThemeProvider>
      </motion.div>
    </body>
  );
};

export default Home;
