import React, { useState } from "react";
import {
  Container,
  Button,
  Typography,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  Slider,
  TextField,
} from "@mui/material";
import Lottie from "lottie-react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";
import { ourPalette } from "../Theme";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TransformImage from "../components/TransformImage";
import gen from "./assets/gen.gif";
import * as GiIcon from "react-icons/gi";
import * as FaIcon from "react-icons/fa";
import load from "./assets/load.json";

import { useDispatch } from "react-redux";
import { setMap } from "../slices/mapSlice";
import { setGenerationDetails } from "../slices/generationSlice";
import { MapRequest } from "../components/MapRequest";

export const Generate = () => {
  const navigateToMapView = useNavigate();
  const dispatch = useDispatch();

  const [infoText, setInfoText] = useState("");
  const [showPopup, setShowPopup] = useState(true); // State to control the visibility of the popup

  const [imgDisplay, setDisplayedImage] = useState(gen);

  // Selection functionality =================================================
  const [selectedTheme, setSelectedTheme] = useState("Graveyard");
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [graveyardButtonColor, setGraveyardButtonColor] = useState(
    ourPalette.white
  );
  const [mansionButtonColor, setMansionButtonColor] = useState(
    ourPalette.primary
  );
  const [basementButtonColor, setBasementButtonColor] = useState(
    ourPalette.primary
  );
  const [smallButtonColor, setSmallButtonColor] = useState(ourPalette.primary);
  const [mediumButtonColor, setMediumButtonColor] = useState(ourPalette.white);
  const [largeButtonColor, setLargeButtonColor] = useState(ourPalette.primary);
  // ========================================================================

  // Advanced Options selections, variables and handlers ====================
  const [variance, setVariance] = useState(0.7);
  const [roomNumber, setRoomNumber] = useState(15);
  const [seed, setSeed] = useState(7);
  const [seedInputError, setSeedInputError] = useState(false);

  const HandleSizeClick = (size) => {
    setRoomNumber(-1);
    if (size.trim() === "Small".trim()) {
      setSelectedSize("Small");
      setSmallButtonColor(ourPalette.white);
      setMediumButtonColor(ourPalette.primary);
      setLargeButtonColor(ourPalette.primary);
    } else if (size.trim() === "Medium".trim()) {
      setSelectedSize("Medium");
      setSmallButtonColor(ourPalette.primary);
      setMediumButtonColor(ourPalette.white);
      setLargeButtonColor(ourPalette.primary);
    } else if (size.trim() === "Large".trim()) {
      setSelectedSize("Large");
      setSmallButtonColor(ourPalette.primary);
      setMediumButtonColor(ourPalette.primary);
      setLargeButtonColor(ourPalette.white);
    }
  };

  const handleThemeClick = (theme) => {
    console.log(`Generating dungeon...`);
    setShowPopup(false);

    if (theme.trim() === "Graveyard".trim()) {
      setSelectedTheme("Graveyard");
      setGraveyardButtonColor(ourPalette.white);
      setMansionButtonColor(ourPalette.primary);
      setBasementButtonColor(ourPalette.primary);
    } else if (theme.trim() === "Mansion".trim()) {
      setSelectedTheme("Mansion");
      setGraveyardButtonColor(ourPalette.primary);
      setMansionButtonColor(ourPalette.white);
      setBasementButtonColor(ourPalette.primary);
    } else if (theme.trim() === "Basement".trim()) {
      setSelectedTheme("Basement");
      setGraveyardButtonColor(ourPalette.primary);
      setMansionButtonColor(ourPalette.primary);
      setBasementButtonColor(ourPalette.white);
    }
  };
  // ==============================================================================

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateClick = () => {
    if (seedInputError) {
      alert("Seed must be an integer!");
      return;
    }

    setIsGenerating(true);

    const request = {
      theme: selectedTheme,
      size: selectedSize,
      roomNumber: roomNumber,
      variance: variance,
      seed: seed,
    };

    MapRequest(request)
      .then((blob) => {
        const obj = blob;
        setDisplayedImage(obj.mapImage);
        dispatch(setMap(obj.mapImage));
        dispatch(setGenerationDetails(obj.info));
        navigateToMapView("/MapView");
      })
      .catch((error) => {
        setIsGenerating(false);
        alert("Error: " + error.message);
        console.error("Error:", error);
      });
  };

  const handleSeedChange = (event) => {
    const seedInput = event.target.value;
    setSeed(seedInput);
    setSeedInputError(seed % 1 !== 0);
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
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
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
                background: ourPalette.pageGradient,
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
                      color: graveyardButtonColor,
                      borderColor: graveyardButtonColor,
                      borderRadius: "2px",
                      fontFamily: "Monospace",
                      backgroundColor: ourPalette.blank,
                    }}
                    onClick={() => handleThemeClick("Graveyard")}
                    onMouseOver={() =>
                      handleMouseOver(
                        "Graveyard: A spooky and haunted place filled with undead creatures."
                      )
                    }
                    onMouseOut={handleMouseOut}
                  >
                    Graveyard
                    <GiIcon.GiPirateGrave style={{ marginLeft: "7%" }} />
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="medium"
                    style={{
                      marginBottom: "15px",
                      color: mansionButtonColor,
                      borderColor: mansionButtonColor,
                      borderRadius: "2px",
                      fontFamily: "Monospace",
                      backgroundColor: ourPalette.blank,
                    }}
                    onClick={() => handleThemeClick("Mansion")}
                    onMouseOver={() =>
                      handleMouseOver(
                        "Mansion: A grand house that may have hidden secrets and rooms."
                      )
                    }
                    onMouseOut={handleMouseOut}
                  >
                    Mansion
                    <GiIcon.GiGhost style={{ marginLeft: "7%" }} />
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="medium"
                    style={{
                      marginBottom: "15px",
                      color: basementButtonColor,
                      borderColor: basementButtonColor,
                      borderRadius: "2px",
                      fontFamily: "Monospace",
                      backgroundColor: ourPalette.blank,
                    }}
                    onClick={() => handleThemeClick("Basement")}
                    onMouseOver={() =>
                      handleMouseOver(
                        "Basement: The dark underbelly of a house, where unknown dangers lurk."
                      )
                    }
                    onMouseOut={handleMouseOut}
                  >
                    Basement
                    <GiIcon.GiUndergroundCave style={{ marginLeft: "7%" }} />
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
                          borderColor: smallButtonColor,
                          borderRadius: "2px",
                          fontFamily: "Monospace",
                          backgroundColor: ourPalette.blank,
                        }}
                        onClick={() => HandleSizeClick("Small")}
                        onMouseOver={() =>
                          handleMouseOver("Small map size (7 rooms)")
                        } // Please correct if wrong
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
                          borderColor: mediumButtonColor,
                          borderRadius: "2px",
                          fontFamily: "Monospace",
                          backgroundColor: ourPalette.blank,
                        }}
                        onClick={() => HandleSizeClick("Medium")}
                        onMouseOver={() =>
                          handleMouseOver("Medium map size (15 rooms)")
                        } // PLease correct if wrong
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
                          borderColor: largeButtonColor,
                          borderRadius: "2px",
                          fontFamily: "Monospace",
                          backgroundColor: ourPalette.blank,
                        }}
                        onClick={() => HandleSizeClick("Large")}
                        onMouseOver={() =>
                          handleMouseOver("Large map size (30 rooms)")
                        } // Please correct if wrong
                        onMouseOut={handleMouseOut}
                      >
                        L
                      </Button>
                    </Grid>
                  </Grid>
                  <Typography
                    variant="h6"
                    sx={{
                      marginTop: "9%",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: ourPalette.secondary,
                    }}
                  >
                    Advanced Options
                  </Typography>
                  <div>
                    <p
                      style={{
                        fontFamily: "monospace",
                        color: ourPalette.white,
                      }}
                    >
                      Tile Variance
                    </p>
                    <Slider
                      defaultValue={0.7}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      min={0.0}
                      max={1.0}
                      step={0.01}
                      onMouseOver={() => {
                        setInfoText("The variance of the dungeon's tileset");
                      }} // Please change idk what it is yey
                      onMouseOut={() => {
                        setInfoText("");
                      }}
                      onChangeCommitted={(e, value) => {
                        setVariance(value);
                      }}
                      sx={{
                        "& .MuiSlider-thumb": {
                          borderRadius: "1px",
                          color: ourPalette.white,
                          width: "10%",
                          height: "40%",
                        },
                        "& .MuiSlider-valueLabel": {
                          fontFamily: "monospace",
                          backgroundColor: ourPalette.blank,
                        },
                      }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "monospace",
                        color: ourPalette.white,
                      }}
                    >
                      Room Number
                    </p>
                    <Slider
                      defaultValue={15}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                      step={1}
                      onMouseOver={() => {
                        setInfoText("The number of rooms in your dungeon");
                      }} // Please change if needed
                      onMouseOut={() => {
                        setInfoText("");
                      }}
                      onChangeCommitted={(e, value) => {
                        setSelectedSize("");
                        setSmallButtonColor(ourPalette.primary);
                        setMediumButtonColor(ourPalette.primary);
                        setLargeButtonColor(ourPalette.primary);
                        setSelectedSize("none");
                        setRoomNumber(value);
                      }}
                      sx={{
                        "& .MuiSlider-thumb": {
                          borderRadius: "1px",
                          color: ourPalette.white,
                          width: "10%",
                          height: "40%",
                        },
                        "& .MuiSlider-valueLabel": {
                          fontFamily: "monospace",
                          backgroundColor: ourPalette.blank,
                        },
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "monospace",
                        color: ourPalette.white,
                      }}
                    >
                      Seed
                    </p>
                    <TextField
                      variant="filled"
                      label="Seed"
                      sx={{
                        input: {
                          color: ourPalette.white,
                          backgroundColor: ourPalette.blank,
                        },
                        label: {
                          color: ourPalette.white,
                          fontFamily: "monospace",
                        },
                      }}
                      value={seed}
                      onChange={handleSeedChange}
                      error={seedInputError}
                    ></TextField>
                  </div>
                  {/* <Box
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
                  </Box> */}
                </div>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{
                    marginBottom: "20px",
                    color: ourPalette.primary,
                    borderRadius: "2px",
                    borderColor: ourPalette.primary,
                    backgroundColor: ourPalette.black,
                    width: "100%",
                    fontFamily: "Monospace",
                  }}
                  onClick={handleGenerateClick}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = ourPalette.secondary;
                    e.currentTarget.style.color = ourPalette.secondary;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = ourPalette.primary;
                    e.currentTarget.style.color = ourPalette.primary;
                  }}
                >
                  Generate
                  <FaIcon.FaLocationArrow style={{ marginLeft: "7%" }} />
                </Button>
              </Container>
            </Grid>
            {/* Game Window on the right */}
            <Grid item xs={10}>
              <div
                style={{ width: "100%", height: "100vh", position: "relative" }}
              >
                <TransformImage
                  img={imgDisplay}
                  imgHeight={"120vh"}
                  imgWidth={"90vw"}
                  left={"-5vw"}
                />
                {/* Popup */}
                <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
                  <DialogTitle>Please select a Theme and Map size</DialogTitle>
                </Dialog>
                <Dialog open={isGenerating}>
                  <DialogTitle
                    style={{
                      background: ourPalette.blank,
                      borderRadius: "2px",
                    }}
                  >
                    <center>
                      <Typography
                        variant="h5"
                        style={{
                          fontFamily: "monospace",
                          color: ourPalette.secondary,
                        }}
                      >
                        Generating
                      </Typography>
                      <Lottie animationData={load} style={{ width: "5vw" }} />
                    </center>
                  </DialogTitle>
                </Dialog>
              </div>
            </Grid>
          </Grid>
        </ThemeProvider>
      </motion.div>
    </body>
  );
};

export default Generate;
