import React, { useState } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { SplitScreen } from "../components/SplitScreen";
import Lottie from "lottie-react"

import animationData from "./assets/overlay.json"
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
  const navigateToGenerate = useNavigate();
  const navigateToView = useNavigate();

  return (
    <SplitScreen leftSpace={3} rightSpace={5}>
      <Container height="100vh">
        <div className="logo-div" />
        <div className="code-div">
          <h2 style={{ color: "#ffffff" }} className="code-prompt" >
            Enter Your Game ID
          </h2>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                label="9-digit Code"
                variant="outlined"
                color="secondary"
                focused
                className="text-field"
              />
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" className="button" onClick={() => navigateToView('/DMView')}>
                <Typography
                  variant="body1"
                  className="button-text"
                >
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
          <Button variant="contained" className="button" onClick={() => navigateToGenerate('/Generate')}>
            <Typography
              variant="body1"
              className="button-text"
            >
              Generate
            </Typography>
          </Button>
          <h3 style={{ color: "#ffffff" }}>
            Load A Previously Generated Dungeon!
          </h3>
          <Button variant="contained" style={{

          }}>
            <Typography
              variant="body1"
              className="button-text"
            >
              Load
            </Typography>
          </Button>
        </div>
      </Container>
      <div className="animation-div">
        <Lottie animationData={animationData} className="animation" />
      </div>
    </SplitScreen>
  );
}

export default Home;
