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
import theme from "../Theme";
import { ourPalette } from "../Theme";
import { motion } from "framer-motion";
import TransformImage from "../components/TransformImage";
import gen from "./assets/gen.gif";
import * as GiIcon from "react-icons/gi";
import * as FaIcon from "react-icons/fa";

export const Generate = () => {
  const [infoText, setInfoText] = useState("");
  const [showPopup, setShowPopup] = useState(true); // State to control the visibility of the popup

  // Selection functionality
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
  const [mediumButtonColor, setMediumButtonColor] = useState(
    ourPalette.white
  );
  const [largeButtonColor, setLargeButtonColor] = useState(ourPalette.primary);

  const HandleSizeClick = (size) => {
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

  const handleGenerateClick = () => {
    // Ideally somee fetch requests
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
                          borderColor: mediumButtonColor,
                          borderRadius: "2px",
                          fontFamily: "Monospace",
                          backgroundColor: ourPalette.blank,
                        }}
                        onClick={() => HandleSizeClick("Medium")}
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
                          borderColor: largeButtonColor,
                          borderRadius: "2px",
                          fontFamily: "Monospace",
                          backgroundColor: ourPalette.blank,
                        }}
                        onClick={() => HandleSizeClick("Large")}
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
};

export default Generate;
