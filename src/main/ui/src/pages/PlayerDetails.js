import React, { useState } from "react";
import { SplitScreen } from "../components/SplitScreen";
import { ThemeProvider } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";
import theme from "../Theme";
import "./PlayerDetails.css";
import lostEyes from "./assets/lostEyes.gif";
import monsters from "./assets/monsters.gif";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setPlayerName } from "../slices/playerNameSlice";
import { setPlayerRole } from "../slices/roleSlice";
import { ourPalette } from "../Theme";
import character from "./assets/hood.png"

function PlayerDetails() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const navigateToPlayerView = useNavigate();

  const dispatch = useDispatch();

  // Function to handle button click
  const handleAdventureStart = () => {
    dispatch(setPlayerName(name))
    dispatch(setPlayerRole(role))
    navigateToPlayerView("/PlayerView")
  };

  const isButtonDisabled = name.trim() === "" || role.trim() === "";

  return (
    <body style={{background:ourPalette.pageGradient}} className="PlayerDetails">
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
    >
      <ThemeProvider theme={theme}>
        <SplitScreen leftSpace={1} rightSpace={3}>
          <div>
            <h1 style={{ color: ourPalette.secondary, fontFamily: 'Monospace'}} className="title-text">
              Who Are You?
            </h1>
            <h3 style={{ color: ourPalette.white }} className="help-text">
              Before you enter the game, inscribe your name and role below.
            </h3>

            <h4
              style={{ color: ourPalette.white, marginTop: "9vh", marginLeft: "7vw", fontFamily: 'Monospace' }}
            >
              Enter your Name
            </h4>
            <TextField
              sx={{
                input: {
                  color: ourPalette.white,
                },
                marginLeft: "7vw",
                marginTop: "",
              }}
              InputProps={{
                style: { color: ourPalette.white, fontFamily: 'Courier New, monospace', fontSize: '90%' }
              }}
              label="Name"
              variant="filled"
              color="secondary"
              autoFocus={true}
              className="text-field"
              fullWidth={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <h4
              style={{ color: ourPalette.white, marginTop: "4vh", marginLeft: "7vw", fontFamily: 'Monospace' }}
            >
              Declare your Role
            </h4>
            <TextField
              sx={{
                input: {
                  color: "#ffffff",
                },
                marginLeft: "7vw",
                marginTop: "1vh",
              }}
              InputProps={{
                style: { color: ourPalette.white, fontFamily: 'Courier New, monospace', fontSize: '90%' }
              }}
              label="Role"
              variant="filled"
              color="secondary"
              autoFocus={true}
              className="text-field"
              fullWidth={true}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <Button
              variant="outlined"
              size="large"
              style={{ marginLeft: "7vw", marginTop: "5vh" }}
              onClick={handleAdventureStart}
              disabled={isButtonDisabled}
              sx={{
                fontFamily: 'Monospace',
                "&.Mui-disabled": {
                  borderColor: ourPalette.disabled,
                  color: ourPalette.disabled, // Text color in disabled state
                },
                "&:hover": {
                  borderColor: ourPalette.primary,
                  color: ourPalette.primary,
                },
              }}
            >
              Start Your Adventure
            </Button>
          </div>
          <div>
            {/* <img
              src={monsters}
              alt="crashed"
              style={{
                marginTop: "1vh",
                marginLeft: "35%",
                width: "60%",
                height: "10%",
              }}
            />
            <img
              src={lostEyes}
              alt="crashed"
              style={{
                marginTop: "-4vh",
                marginLeft: "35%",
                width: "60%",
                height: "60vh",
              }}
            /> */}
            <img
              src={character}
              alt="crashed"
              style={{
                marginLeft: "33vw",
                marginTop:"7vh",
                width: "60%",
                height: "60%",
              }}
            />
          </div>
        </SplitScreen>
      </ThemeProvider>
    </motion.div>
    </body>
  );
}

export default PlayerDetails;
