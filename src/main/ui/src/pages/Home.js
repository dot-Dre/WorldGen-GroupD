import React, { useState } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Modal,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { SplitScreen } from "../components/SplitScreen";
import { DragDrop } from "../components/DragDrop";
import { ThemeProvider } from "@mui/material/styles";
import theme, { ourPalette } from "../Theme";
import { motion } from "framer-motion";
import * as BiIcons from "react-icons/bi";
import { Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { setMap } from "../slices/mapSlice";
import { MapRequest } from "../components/MapRequest";

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

import "./Home.css";
import logo from "./assets/logo.png";
import gen from "./assets/gen.gif";

export const Home = () => {
  const navigateToGenerate = useNavigate();
  const navigateToMapView = useNavigate();
  const naviagetToDetails = useNavigate();

  const dispatch = useDispatch();

  const [loadButtonColor, setLoadButtonColor] = useState("primary");
  const [createButtonColor, setCreateButtonColor] = useState("primary");
  const [goButtonColor, setGoButtonColor] = useState("primary");

  const [isLoadButtonHovered, setIsLoadButtonHovered] = useState(false);
  const [isGenerateButtonHovered, setIsGenerateButtonHovered] = useState(false);
  const [generateModalOpen, setGenerateModalOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const [file, setFile] = useState(null);
  const onFileChange = (file) => setFile(file);

  const [gameCode, setGameCode] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleGameCodeChange = (event) => {
    const inputValue = event.target.value;
    setGameCode(inputValue);
    setInputError(inputValue.length !== 9 || !/^\d+$/.test(inputValue));
  };

  const gameCodeSubmit = () => {
    localStorage.setItem("gameCode", gameCode);
    naviagetToDetails("/PlayerDetails");
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const RandomMapGenerate = () => {
    setIsGenerating(true);
    // Define possible values for theme and size
    const themes = ["Basement", "Mansion", "Graveyard"];
    const sizes = ["Small", "Medium", "Large"];

    // Randomly select a theme and size
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

    const request = {
      theme: randomTheme,
      size: randomSize,
    };

    MapRequest(request)
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob); // Extract the Blob URL
        // setDisplayedImage(imageUrl)
        dispatch(setMap(imageUrl));
        navigateToMapView("/MapView");
      })
      .catch((error) => {
        setIsGenerating(false);
        alert("Error: " + error.message);
        console.error("Error:", error);
      });
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
                  value={gameCode}
                  onChange={handleGameCodeChange}
                  error={inputError}
                />
                <Button
                  sx={RocketButtonStyles}
                  variant="outlined"
                  size="small"
                  color={goButtonColor}
                  disabled={inputError}
                  onClick={gameCodeSubmit}
                >
                  <Typography variant="body1">
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

              <h3 style={GenerateTextStyles}>Generate A Dungeon!</h3>
              <Button
                variant="outlined"
                size="small"
                color={createButtonColor}
                onClick={() => setGenerateModalOpen(true)}
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
                <Typography variant="body1" sx={CreateButtonTextStyles}>
                  Create Dungeon
                </Typography>
              </Button>

              <h3 style={LoadTextStyles}>
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
                onClick={() => setOpen(true)}
                style={LoadButtonStyles}
              >
                <Typography variant="body1" sx={LoadButtonTextStyles}>
                  Load Dungeon
                </Typography>
              </Button>

              <p style={DescriptionTextStyles}>
                {isLoadButtonHovered
                  ? 'Rediscover history with the "Load" button...'
                  : isGenerateButtonHovered
                  ? 'Unleash terror with the "Generate" button...'
                  : ""}
              </p>

              {/* Load Dungeon Modal */}
              <Modal open={open} onClose={() => setOpen(false)}>
                <DragDrop onFileChange={(files) => onFileChange(files)} />
              </Modal>

              {/* Generate Dungeon Modal */}
              <Modal
                open={generateModalOpen}
                onClose={() => setGenerateModalOpen(false)}
                aria-labelledby="dungeon-modal-title"
                aria-describedby="dungeon-modal-description"
              >
                <div
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    background: ourPalette.tabGradient,
                    padding: "20px",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
                    borderRadius: "2px",
                  }}
                >
                  <Button
                    variant="outlined"
                    style={{ marginBottom: "10px" }}
                    onClick={() => {
                      RandomMapGenerate();
                      setGenerateModalOpen(false);
                    }}
                  >
                    Quick Generate
                  </Button>
                  <Typography
                    variant="body2"
                    style={{
                      marginBottom: "15px",
                      fontFamily: "monospace",
                      color: ourPalette.white,
                    }}
                  >
                    Generate a map with a press of a button, instantly dive into
                    a new DnD adventure!
                  </Typography>
                  <Divider
                    style={{ marginBottom: "15px", marginTop: "15px" }}
                  />{" "}
                  {/* <-- The Divider */}
                  <Button
                    variant="outlined"
                    style={{ marginBottom: "10px", borderRadius: "2px" }}
                    onClick={() => {
                      navigateToGenerate("/Generate");
                      setGenerateModalOpen(false);
                    }}
                  >
                    Custom Generate
                  </Button>
                  <Typography
                    variant="body2"
                    style={{ fontFamily: "monospace", color: ourPalette.white }}
                  >
                    Customize your story! Select map size and dungeon theme to
                    create a dungeon that's tailored for the story you want to
                    tell!
                  </Typography>
                </div>
              </Modal>
              <Divider />
            </Container>
            <img src={gen} alt="crashed" style={LeftImageStyles} />
          </SplitScreen>
          <Dialog open={isGenerating}>
            <DialogTitle style={{ background: ourPalette.blank, borderRadius:"2px" }}>
              <Typography
                variant="h5"
                style={{ fontFamily: "monospace", color: ourPalette.white }}
              >
                Generating . . .
              </Typography>
            </DialogTitle>
          </Dialog>
        </ThemeProvider>
      </motion.div>
    </body>
  );
};

export default Home;
