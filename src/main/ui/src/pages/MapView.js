import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { ourPalette } from "../Theme";
import TransformImage from "../components/TransformImage";
import * as IoIcon from "react-icons/io5";
import * as BiIcon from "react-icons/bi";
import theme from "../Theme";
import { ThemeProvider } from "@mui/material/styles";
import dummy from "./assets/test.png";
import SpeedDial from "@mui/material/SpeedDial";
import { SpeedDialAction } from "@mui/material";
import { MapRequest } from "../components/MapRequest";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function MapView() {
  const [show, setShow] = useState(true);
  const [displayMap, setDisplayMap] = useState(useSelector((state) => state.mapState.map));

  const generationDetails = useSelector((state) => state.generationState.generation)

  const roomOrSize = generationDetails.size === "none" ? `Number of Rooms: ${generationDetails.roomNumber}` : `Size: ${generationDetails.size}`

  const mapDetails = `Theme: ${generationDetails.theme}\n${roomOrSize}\nSeed: ${generationDetails.seed}\nVariance: ${generationDetails.variance}`

  const SaveMap = () => {
    const createAndDownloadJson = async () => {
      try {
        const base64Image = displayMap

        const jsonObject = {
          info:generationDetails,
          map: base64Image
        };

        // Create a JSON blob
        const jsonBlob = new Blob([JSON.stringify(jsonObject)], {
          type: 'application/json',
        });

        // Create a temporary URL for the blob
        const jsonBlobUrl = URL.createObjectURL(jsonBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = jsonBlobUrl;
        downloadLink.download = 'map.json';

        // Trigger the download
        downloadLink.click();

        // Clean up
        URL.revokeObjectURL(jsonBlobUrl);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    createAndDownloadJson()
  };

  const reveal = () => {
    setShow(!show);
  };

  const actions = [
    {
      icon: <BiIcon.BiSolidSave />,
      name: "Save your dungeon as a .json file!",
      onClick: () => {
        SaveMap()
      },
    },
    { icon: <BiIcon.BiSolidPrinter />, name: "Print your map!" },
  ];

  const tabStyle = {
    flex: 1,
    background: ourPalette.pageGradient,
    marginLeft: show ? 0 : "-40%",
    transition: "margin-left 0.1s ease",
    width: "20%",
    height: "100vh",
  };

  const tabImgStyle = {
    // position: "absolute",
    marginLeft: show ? "20vw" : "15vw",
    transition: "margin-left 0.1s ease",
    marginTop: "-100vh",
  };

  const ControlPanel = () => {
    const navigateToGenerate = useNavigate();
    const [infoText, setInfoText] = useState(
      mapDetails
    );

    const handleRegenerateClick = () => {
      navigateToGenerate("/Generate")
    };

    const handleBeginGame = () => {
      console.log(`Beginning game...`);
      // Logic for starting the game
    };

    return (
      <>
        <Typography
          variant="h3"
          style={{
            fontFamily: "Monospace",
            fontWeight: "Bold",
            paddingLeft: "12%",
            paddingTop: "12%",
            color: ourPalette.secondary,
          }}
        >
          All Done!
        </Typography>
        <Typography
          variant="p"
          style={{
            fontFamily: "Monospace",
            paddingLeft: "12%",
            fontSize: "20px",
            color: ourPalette.white,
          }}
        >
          Map Details
        </Typography>
        <TextField
          // fullWidth
          variant="filled"
          multiline
          rows={7}
          style={{
            marginLeft: "12%",
            marginTop: "5%",
            width: "70%",
            backgroundColor: ourPalette.blank,
            borderRadius: "2px",
          }}
          value={infoText}
          inputProps={{
            style: {
              fontFamily: "Monospace",
              color: ourPalette.white,
            },
          }}
          // disabled // If you don't want users to modify it
        />
        <Button
          variant="outlined"
          onClick={handleBeginGame}
          style={{
            marginLeft: "12%",
            marginTop: "5%",
            width: "70%",
            backgroundColor: ourPalette.blank,
            borderRadius: "2px",
            borderColor: ourPalette.secondary,
            color: ourPalette.secondary,
          }}
        >
          Begin Game
        </Button>
        <Typography
          style={{
            fontFamily: "Monospace",
            paddingLeft: "12%",
            paddingTop: "5%",
            fontSize: "20px",
            color: ourPalette.white,
          }}
        >
          Save Options
        </Typography>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          direction="down"
          FabProps={{
            style: {
              width: "50px",
              height: "50px",
              borderRadius: "0%",
              backgroundColor: ourPalette.blank,
              borderColor: ourPalette.white,
            },
          }}
          style={{
            marginLeft: "-70%",
            marginTop: "5%",
            paddingLeft: "5%",
          }}
          icon={<BiIcon.BiDownload />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
        <Typography
          style={{
            fontFamily: "Monospace",
            paddingLeft: "12%",
            paddingTop: "5%",
            fontSize: "15px",
            color: ourPalette.white,
          }}
        >
          Not Happy?
        </Typography>
        <Button
        variant="outlined"
          style={{marginLeft: "12%",
          marginTop: "5%",
          width: "70%",
          backgroundColor: ourPalette.blank,
          borderRadius: "2px",
          borderColor: ourPalette.secondary,
          color: ourPalette.secondary,}}
          onClick={handleRegenerateClick}
        >
          Regenerate
        </Button>
      </>

    );
  };

  return (
    <body style={{ background: ourPalette.black, overflow: "hidden", height:"100vh" }}>
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
            <div>
              <ControlPanel />
            </div>
          </nav>
          <div style={tabImgStyle}>
            <TransformImage img={displayMap} imgWidth={"50vw"} imgHeight={"80vh"} left={"10vw"} top={"10vh"} />
          </div>
          { !show ? <SpeedDial
            ariaLabel="SpeedDial basic example"
            direction="up"
            FabProps={{
              style: {
                width: "50px",
                height: "50px",
                borderRadius: "0%",
                backgroundColor: ourPalette.primary,
              },
            }}
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<BiIcon.BiDownload />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.onClick}
              />
            ))}
          </SpeedDial> : <></>}
        </ThemeProvider>
      </motion.div>
    </body>
  );
}

export default MapView;
