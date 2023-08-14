import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Home.css";

/**
 * This function returns the Home page component. This page
 * serves as a bridge for users of the application to enter a running game,
 * or generate a new map and host a new game off a newly
 * generated map.
 *
 * @returns This function returns the Home page component.
 */
function Home() {

  const navigateToGenerate = useNavigate()
  const navigateToView = useNavigate()
  const [showGenerateBlurb, setShowText] = useState(false);

  return (
    <div className="container">
      <Box className="main_box" />
      <Container>
        <Box className="sidebar">
          <Box className="logo" />
          <Typography variant="h4" className="game-code-title">
            Enter Your Game Code
          </Typography>
          <Button variant="contained" className="go-button" onClick={() => navigateToView('/PlayerView')}>
            Go
          </Button>
          <TextField
            id="outlined-basic"
            label="9 digit code"
            variant="outlined"
            className="code-input"
          />
          <Typography variant="h5" className="start-game-title">
            Want To Start a Game?
          </Typography>
          <Button
            variant="contained"
            className="generate-button"
            onClick={() => navigateToGenerate('/Generate')}
            onMouseEnter={() => setShowText(true)}
            onMouseLeave={() => setShowText(false)}
          >
            Generate
          </Button>
          {showGenerateBlurb && (
            <Typography
              variant="body2"
              className={`smooth-text ${showGenerateBlurb ? "fade-in" : ""}`}
              style={{
                position: "absolute",
                left: "5vw",
                top: "77vh",
                width: "25vw",
              }}
            >
              Summon courage as you stand on the brink of dread. Dare to
              traverse the 'Generate' threshold and forge a bespoke DnD horror
              dungeon. Unearth nightmarish secrets, test resilience, and let
              terror tell your tale. Embark now on a chilling odyssey that only
              the brave survive.
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default Home;
