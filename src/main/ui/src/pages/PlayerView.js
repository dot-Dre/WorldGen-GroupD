import React, { useState } from "react";
import { Button, Container, Grid, IconButton } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Lottie from "lottie-react";
import animationData from "./assets/overlay.json";
import theme from "../Theme";
import PlayerList from "../components/PlayerList";
import data from "./testData/mockPlayers.json";
import { ourPalette } from "../Theme";
import { color, motion, useCycle } from "framer-motion";
import * as IoIcon from "react-icons/io5";
import "./PlayerView.css";
import TransformImage from "../components/TransformImage";
import { Link } from "react-router-dom";
import dummy from "./assets/gen.gif";
import { Typography } from "@mui/material";

function PlayerView() {
  const [show, setShow] = useState(true);
  const [slide, setSlide] = useCycle(2, 1);

  const reveal = () => {
    setShow(!show);
    setSlide();
  };

  const tabStyle = {
    flex: 1,
    background: ourPalette.tabGradient,
    marginLeft: show ? 0 : "-40%",
    // opacity: show ? 1 : 0,
    transition: "margin-left 0.1s ease",
    width: "20%",
    height: "100vh",
  };

  const tabImgStyle = {
    position: "absolute",
    marginLeft: show ? "20vw" : "15vw",
    transition: "margin-left 0.1s ease",
    marginTop: "-100vh",
  };

  return (
    <body style={{ background: ourPalette.black, overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ThemeProvider theme={theme}>
          <nav style={{ backgroundColor: ourPalette.blank, height:"3vh" }}>
            <Button onClick={reveal}>
              {show ? <IoIcon.IoCaretBack/> : <IoIcon.IoCaretForward/>}
            </Button>
          </nav>
          <nav style={tabStyle}>
            <Typography
              variant="h5"
              gutterBottom
              style={{
                fontFamily: "Monospace",
                fontWeight: "Bold",
                textAlign: "left",
                color: ourPalette.secondary,
                fontSize: "3.5vh",
                marginLeft: "12%",
                paddingTop: "7%"
              }}
            >
              Game ID:
            </Typography>
            <div>
              <PlayerList initialData={data} gameID={"234-900-001"} />
            </div>
          </nav>
          <div style={tabImgStyle}>
            <TransformImage img={dummy} imgWidth={"70vw"} imgHeight={"90vh"} />
          </div>
        </ThemeProvider>
      </motion.div>
    </body>
  );
}

export default PlayerView;
