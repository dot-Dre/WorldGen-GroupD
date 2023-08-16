import React, { useState } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { SplitScreen } from "../components/SplitScreen";
import Lottie from "lottie-react"

import logoImage from "./assets/logo.png"; // Adjust the path based on your directory structure
import animationData from "./assets/grids.json"
import "./Home.css";

const LogoDiv = styled("div")({
  backgroundImage: `url(${logoImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "25vw", // Adjust the width as needed
  height: "20vh", // Adjust the height as needed
  marginTop: "5vh",
  marginLeft: "5vw",
});

const CodeDiv = styled("div")({
  marginLeft: "7vw",
});

const GameDiv = styled("div")({
  marginLeft: "7vw",
  marginTop: "12vh"
});

const AnimationDiv = styled("div")({
  marginTop: "0vh"
});

const BlurbDiv = styled("div")({
  marginLeft: "7vw"
})

const textFieldStyles = {
  backgroundColor: "#222822",
  borderRadius: "6px",
  border: "#222822",
};

const buttonStyles = {
  backgroundColor: "#26212a",
  // border: "1px solid #a11cc9", // Set the border style
  // borderColor: "#a11cc9", // Set the border color
  // borderRadius: "0px",
  color: "white",
  height: "5vh",
};

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
  const [showGenerateBlurb, setShowText] = useState(false);

  return (
    <SplitScreen leftSpace={3} rightSpace={4}>
      <Container height="100vh">
        <LogoDiv className="logo" />
        <CodeDiv>
          <h2 style={{ color: "#ffffff" }} className="code_prompt">
            Enter Your Game ID
          </h2>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                label="9-digit Code"
                variant="outlined"
                color="secondary"
                focused
                style={textFieldStyles}
              />
            </Grid>
            <Grid item xs={4}>
              <Button variant="text" color="primary" style={buttonStyles}>
                <Typography
                  variant="body1"
                  style={{ fontFamily: "Arial", fontWeight: "bold" }}
                >
                  Go!
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </CodeDiv>
        <BlurbDiv>
          <p style={{ color: "#ffffff", fontFamily: 'Courier New'}}>
            In dapibus turpis eget turpis tincidunt,
            at fringilla ipsum tempus. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Quisque nec purus nec
            ligula ullamcorper laoreet. Suspendisse potenti.
          </p>
        </BlurbDiv>
        <GameDiv>
          <h3 style={{ color: "#ffffff" }}>Generate A Dungeon!</h3>
          <Button variant="contained" color="primary" style={buttonStyles}>
            <Typography
              variant="body1"
              style={{ fontFamily: "Arial", fontWeight: "bold" }}
            >
              Generate
            </Typography>
          </Button>
          <h3 style={{ color: "#ffffff" }}>
            Load A Previously Generated Dungeon!
          </h3>
          <Button variant="contained" color="primary" style={buttonStyles}>
            <Typography
              variant="body1"
              style={{ fontFamily: "Arial", fontWeight: "bold" }}
            >
              Load
            </Typography>
          </Button>
        </GameDiv>
      </Container>
      <AnimationDiv>
        <Lottie animationData={animationData}/>
      </AnimationDiv>
    </SplitScreen>
  );
}

export default Home;
