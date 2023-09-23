import React, { useState } from "react";
import {
  Container,
  Button,
  Typography,
  Grid,
  Box,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// import Lottie from "lottie-react";
// import animationData from "./assets/overlay.json";
import theme from "../Theme";
import { ourPalette } from "../Theme";
// import { color } from 'framer-motion';
import { motion } from "framer-motion";
import TransformImage from "../components/TransformImage";
import gen from "./assets/gen.gif";
// import "./Generate.css";
import * as GiIcon from "react-icons/gi";

export const Generate = () => {
  const [infoText, setInfoText] = useState("");
  const [showPopup, setShowPopup] = useState(true); // State to control the visibility of the popup

  const handleGenerateClick = () => {
    console.log(`Generating dungeon...`);
    setShowPopup(false); // Hide the popup when the generate button is clicked
    // Add your generation logic here.
  };

  const handleMouseOver = (text) => {
    setInfoText(text);
  };

  const handleMouseOut = () => {
    setInfoText("");
  };

  return (
    <body
      style={{
        background: ourPalette.black,
        overflow: "hidden",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ThemeProvider theme={theme}>
          <Grid
            container
            spacing={0}
            style={{ backgroundColor: ourPalette.pageGradient }}
          >
            {/* Control Panel on the left */}
            <Grid
              item
              xs={2}
              style={{
                background: ourPalette.tabGradient,
                borderRight: "2px solid #080114",
              }}
            >
              <Container
                style={{
                  width: "80%",
                  color: ourPalette.pageGradient,
                  paddingTop: "50px",
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Typography
                    variant="h4"
                    gutterBottom
                    style={{
                      fontFamily: "Monospace",
                      fontWeight: "bold",
                      color: ourPalette.secondary,
                      size: "30vh",
                    }}
                  >
                    Theme
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="medium"
                    style={{
                      marginBottom: "15px",
                      color: ourPalette.white,
                      borderColor: ourPalette.white,
                      borderRadius: "2px",
                      fontFamily: "Monospace",
                      backgroundColor: ourPalette.blank,
                    }}
                    onClick={() => handleGenerateClick("Graveyard")}
                    onMouseOver={() =>
                      handleMouseOver(
                        "Graveyard: A spooky and haunted place filled with undead creatures."
                      )
                    }
                    onMouseOut={handleMouseOut}
                  >
                    Graveyard
                    <GiIcon.GiPirateGrave/>
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="medium"
                    style={{
                      marginBottom: "15px",
                      color: ourPalette.white,
                      borderColor: ourPalette.white,
                      borderRadius: "2px",
                      fontFamily: "Monospace",
                      backgroundColor: ourPalette.blank,
                    }}
                    onClick={() => handleGenerateClick("Mansion")}
                    onMouseOver={() =>
                      handleMouseOver(
                        "Mansion: A grand house that may have hidden secrets and rooms."
                      )
                    }
                    onMouseOut={handleMouseOut}
                  >
                    Mansion
                    <GiIcon.GiGhost/>
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="medium"
                    style={{
                      marginBottom: "15px",
                      color: ourPalette.white,
                      borderColor: ourPalette.white,
                      borderRadius: "2px",
                      fontFamily: "Monospace",
                      backgroundColor: ourPalette.blank,
                    }}
                    onClick={() => handleGenerateClick("Basement")}
                    onMouseOver={() =>
                      handleMouseOver(
                        "Basement: The dark underbelly of a house, where unknown dangers lurk."
                      )
                    }
                    onMouseOut={handleMouseOut}
                  >
                    Basement
                    <GiIcon.GiUndergroundCave/>
                  </Button>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{
                      fontFamily: "Monospace",
                      fontWeight: "bold",
                      color: ourPalette.secondary,
                    }}
                  >
                    Map Size
                  </Typography>
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{
                          color: ourPalette.white,
                          borderColor: ourPalette.buttonBorders.light,
                          borderRadius: "2px",
                          fontFamily: "Monospace",
                          backgroundColor: ourPalette.blank,
                        }}
                        onMouseOver={() => handleMouseOver("Small map size.")}
                        onMouseOut={handleMouseOut}
                      >
                        S
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{
                          color: ourPalette.white,
                          borderColor: ourPalette.buttonBorders.base,
                          borderRadius: "2px",
                          fontFamily: "Monospace",
                          backgroundColor: ourPalette.blank,
                        }}
                        onMouseOver={() => handleMouseOver("Medium map size.")}
                        onMouseOut={handleMouseOut}
                      >
                        M
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{
                          color: ourPalette.white,
                          borderColor: ourPalette.buttonBorders.dark,
                          borderRadius: "2px",
                          fontFamily: "Monospace",
                          backgroundColor: ourPalette.blank,
                        }}
                        onMouseOver={() => handleMouseOver("Large map size.")}
                        onMouseOut={handleMouseOut}
                      >
                        L
                      </Button>
                    </Grid>
                  </Grid>
                  <Box
                    mt={3}
                    p={2}
                    style={{
                      backgroundColor: ourPalette.white,
                      borderRadius: "2px",
                      backgroundColor: ourPalette.blank,
                      borderColor: ourPalette.white,
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: "Monospace",
                        fontSize: "100%",
                        color: ourPalette.white,
                      }}
                    >
                      {infoText}
                    </Typography>
                  </Box>
                </div>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{
                    marginBottom: "20px",
                    color: ourPalette.secondary,
                    borderRadius: "2px",
                    borderColor: ourPalette.secondary,
                    backgroundColor: ourPalette.black,
                    width: "100%",
                    fontFamily: "Monospace",
                  }}
                  onClick={handleGenerateClick}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = ourPalette.primary;
                    e.currentTarget.style.color = ourPalette.primary;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = ourPalette.secondary;
                    e.currentTarget.style.color = ourPalette.secondary;
                  }}
                >
                  Generate
                </Button>
              </Container>
            </Grid>
            {/* Game Window on the right */}
            <Grid item xs={10}>
              <div
                style={{ width: "100%", height: "100vh", position: "relative" }}
              >
                {/* Lottie animation */}
                {/* <Lottie animationData={animationData} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} /> */}
                {/* <img src={} sy/> */}
                <TransformImage
                  img={gen}
                  imgHeight={"120vh"}
                  imgWidth={"90vw"}
                  left={"-5vw"}
                />
                {/* Popup */}
                <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
                  <DialogTitle>Please select a Theme and Map size</DialogTitle>
                </Dialog>
              </div>
            </Grid>
          </Grid>
        </ThemeProvider>
      </motion.div>
    </body>
  );
}

export default Generate;
