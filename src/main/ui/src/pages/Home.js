import React, { useState } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography, Modal, Box } from "@mui/material";
import { SplitScreen } from "../components/SplitScreen";
import { DragDrop } from "../components/DragDrop"
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";
import Lottie from "lottie-react";

import animationData from "./assets/overlay.json";
import "./Home.css";
import logo from "./assets/logo.png"

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
  const [loadButtonColor, setLoadButtonColor] = useState("primary")
  const [createButtonColor, setCreateButtonColor] = useState("primary")
  const [goButtonColor, setGoButtonColor] = useState("primary")
  const [file, setFile] = useState(null)

  const [isLoadButtonHovered, setIsLoadButtonHovered] = useState(false);
  const handleLoadButtonMouseEnter = () => {
    setIsLoadButtonHovered(true);
    setLoadButtonColor("secondary")
  };
  const handleLoadButtonMouseLeave = () => {
    setIsLoadButtonHovered(false);
    setLoadButtonColor("primary")
  };

  const [isGenerateButtonHovered, setIsGenerateButtonHovered] = useState(false);
  const handleGenerateButtonMouseEnter = () => {
    setIsGenerateButtonHovered(true);
    setCreateButtonColor("secondary")
  };
  const handleGenerateButtonMouseLeave = () => {
    setIsGenerateButtonHovered(false);
    setCreateButtonColor("primary")
  };

  const [isGoButtonHovered, setIsGoButtonHovered] = useState(false);
  const handleGoButtonMouseEnter = () => {
    setIsGoButtonHovered(true);
    setGoButtonColor("secondary")
  };
  const handleGoButtonMouseLeave = () => {
    setIsGenerateButtonHovered(false);
    setGoButtonColor("primary")
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFileChange = (file) => {
    setFile(file)
  }

  return (
    <ThemeProvider theme={theme}>
      <SplitScreen leftSpace={2} rightSpace={1.5}>
        <Container height="100vh">
          {/* <div className="logo-div"/> */}
          <img src={logo} style={{
            marginLeft: "5vw",
            width: "35vw",
            height: "35vh"
          }}/>
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
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  size="small"
                  color={goButtonColor}
                  className="button"
                  onClick={() => navigateToView("/DMView")}
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
              <DragDrop onFileChange={(files) => onFileChange(files)}/>
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
        <div className="animation-div">
          <Lottie animationData={animationData} className="animation" />
        </div>
      </SplitScreen>
    </ThemeProvider>
  );
}

export default Home;
