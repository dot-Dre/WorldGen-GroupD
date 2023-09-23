import React, { useState } from "react";
import { Button, Container, Grid, IconButton } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";
import PlayerList from "../components/PlayerList";
import data from "./testData/mockPlayers.json";
import { ourPalette } from "../Theme";
import { motion, useCycle } from "framer-motion";
import * as IoIcon from "react-icons/io5";
import "./DMView.css";
import TransformImage from "../components/TransformImage";
import dummy from "./assets/testMap.png";
import { Typography, Dialog, DialogTitle } from "@mui/material";
import PlayerIcon from "../components/PlayerIcon";
import MapPin from "../components/MapPin";

function DMView() {
  const [show, setShow] = useState(true);
  const [showPopup, setShowPopup] = useState(true);
  const [pinPlaced, setPinPlaced] = useState(false);
  const [pinPosition, setPinPosition] = useState({ x: 0, y: 0 });

  const reveal = () => {
    setShow(!show);
  };

  const handleMapClick = (e) => {
    if (!pinPlaced) {
      const x = e.clientX;
      const y = e.clientY;
      setPinPosition({ x, y });
      setPinPlaced(true);
    }
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
    <body
      style={{ background: ourPalette.black, overflow: "hidden" }}
      onClick={handleMapClick}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ThemeProvider theme={theme}>
          <nav style={{ backgroundColor: ourPalette.blank, height: "3vh" }}>
            <Button onClick={reveal}>
              {show ? <IoIcon.IoCaretBack /> : <IoIcon.IoCaretForward />}
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
                paddingTop: "7%",
              }}
            >
              Game ID
            </Typography>
            <div>
              <PlayerList
                initialData={data}
                gameID={"234-900-001"}
                isDMView={true}
              />
            </div>
          </nav>
          <div style={tabImgStyle}>
            {/* <TransformImage img={dummy} imgWidth={"70vw"} imgHeight={"90vh"} /> */}
          </div>
          {pinPlaced && (
            <MapPin initialX={pinPosition.x} initialY={pinPosition.y} />
          )}
        </ThemeProvider>
      </motion.div>
      <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
        <DialogTitle>
          Click anywhere on the map to select a starting area
        </DialogTitle>
      </Dialog>
    </body>
  );
}

export default DMView;
