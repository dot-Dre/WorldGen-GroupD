import React, { useState } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography, Modal } from "@mui/material";
import { SplitScreen } from "../components/SplitScreen";
import { DragDrop } from "../components/DragDrop";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import animationData from "./assets/overlay.json";
import "./Home.css";
import logo from "./assets/logo.png";
import hall from "./assets/hood.png"
import overlay from "./assets/overlaygrid.png";
import gen from "./assets/gen.gif"
import { useSelector } from "react-redux";

/**
 * This function returns the Home page component. This page
 * serves as a bridge for users of the application to enter a running game,
 * or generate a new map and host a new game off a newly
 * generated map.
 *
 * @returns This function returns the Home page component.
 */
function Home() {
  const navigateToGenerate = useNavigate();
  const navigateToView = useNavigate();
  const [loadButtonColor, setLoadButtonColor] = useState("primary");
  const [createButtonColor, setCreateButtonColor] = useState("primary");
  const [goButtonColor, setGoButtonColor] = useState("primary");
  const [file, setFile] = useState(null);

  const [isLoadButtonHovered, setIsLoadButtonHovered] = useState(false);
  const handleLoadButtonMouseEnter = () => {
    setIsLoadButtonHovered(true);
    setLoadButtonColor("secondary");
  };
  const handleLoadButtonMouseLeave = () => {
    setIsLoadButtonHovered(false);
    setLoadButtonColor("primary");
  };

  const [isGenerateButtonHovered, setIsGenerateButtonHovered] = useState(false);
  const handleGenerateButtonMouseEnter = () => {
    setIsGenerateButtonHovered(true);
    setCreateButtonColor("secondary");
  };
  const handleGenerateButtonMouseLeave = () => {
    setIsGenerateButtonHovered(false);
    setCreateButtonColor("primary");
  };

  const [isGoButtonHovered, setIsGoButtonHovered] = useState(false);
  const handleGoButtonMouseEnter = () => {
    setIsGoButtonHovered(true);
    setGoButtonColor("secondary");
  };
  const handleGoButtonMouseLeave = () => {
    setIsGenerateButtonHovered(false);
    setGoButtonColor("primary");
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFileChange = (file) => {
    setFile(file);
  };

  const [gameCode, setGameCode] = useState(""); // Initialize gameCode as an empty string
  const [inputError, setInputError] = useState(false);

  const handleGameCodeChange = (event) => {
    const inputValue = event.target.value;
    setGameCode(inputValue);

    setInputError(inputValue.length !== 9 || !/^\d+$/.test(inputValue));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ThemeProvider theme={theme}>
        <SplitScreen leftSpace={2} rightSpace={1.5}>
          <Container height="100vh">
            {/* <div className="logo-div"/> */}
            <img
              src={logo}
              alt="crashed"
              style={{
                marginLeft: "5vw",
                width: "35vw",
                height: "35vh",
              }}
            />
            <div className="code-div">
              <h2 style={{ color: "#ffffff" }} className="code-prompt">
                Enter A Game ID
              </h2>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                <TextField
                    sx={{
                      input: {
                        color: "#ffffff",
                      },
                    }}
                    label="9-digit Code"
                    variant="outlined"
                    color="secondary"
                    autoFocus="True"
                    className="text-field"
                    fullWidth="true"
                    value={gameCode} // Set value to gameCode
                    onChange={handleGameCodeChange} // Add onChange handler
                    error={inputError} // Show error state
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    sx={{
                      "&.Mui-disabled": {
                        borderColor: "#9d82ab",
                        color: "#9d82ab", // Text color in disabled state
                      }
                    }}
                    variant="outlined"
                    size="small"
                    color={goButtonColor}
                    className="button"
                    disabled={inputError}
                    onClick={() => {
                      if (gameCode.length !== 9 || !/^\d+$/.test(gameCode)) {
                        setInputError(true);
                      } else {
                        setInputError(false);
                        navigateToView("/PlayerDetails")
                      }
                    }}
                    onMouseEnter={handleGoButtonMouseEnter}
                    onMouseLeave={handleGoButtonMouseLeave}
                  >
                    <Typography variant="body1" className="button-text">
                      Go!
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </div>
            { inputError ? (
              <p style={{marginLeft:"7vw", marginTop:"2vh"}} className="code-help"> Your game code isn't formatted correctly! </p>
            ) : ( <p style={{marginLeft:"7vw", marginTop:"2vh"}} className="code-help">  e.g 143344561 </p>)}
            {/* <div className="blurb-div">
          <p>
            In dapibus turpis eget turpis tincidunt,
            at fringilla ipsum tempus. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Quisque nec purus nec
            ligula ullamcorper laoreet. Suspendisse potenti.
          </p>
        </div> */}
            <div className="game-div">
              <h3 style={{ color: "#ffffff" }}>Generate A Dungeon!</h3>
              <Button
                variant="outlined"
                size="small"
                color={createButtonColor}
                onClick={() => navigateToGenerate("/Generate")}
                onMouseEnter={handleGenerateButtonMouseEnter}
                onMouseLeave={handleGenerateButtonMouseLeave}
              >
                <Typography variant="body1" className="button-text">
                  Create Dungeon
                </Typography>
              </Button>
              <h3 style={{ color: "#ffffff" }}>
                Load A Previously Generated Dungeon!
              </h3>
              <Button
                variant="outlined"
                color={loadButtonColor}
                size="small"
                onMouseEnter={handleLoadButtonMouseEnter}
                onMouseLeave={handleLoadButtonMouseLeave}
                onClick={handleOpen}
              >
                <Typography variant="body1" className="button-text">
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
            <div className="help-text">
              <p style={{ color: "#ffffff" }}>
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
              style={{
                marginLeft: "2%",
                marginTop: "20%",
                width: "80%",
                height: "80%",
              }}
            />
        </SplitScreen>
      </ThemeProvider>
    </motion.div>
  );
}

export default Home;
