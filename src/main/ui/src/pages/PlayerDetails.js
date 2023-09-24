import React, { useState } from "react";
import { SplitScreen } from "../components/SplitScreen";
import { ThemeProvider } from "@mui/material/styles";
import { TextField, Button, Typography } from "@mui/material";
import theme from "../Theme";
import "./PlayerDetails.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setPlayerName } from "../slices/playerNameSlice";
import { setPlayerRole } from "../slices/roleSlice";
import { ourPalette } from "../Theme";
import character from "./assets/hood.png";
import * as GiIcons from "react-icons/gi";
import {
  EnterYourNameStyles,
  EnterYourRoleStyles,
  ErrorButtonStyles,
  ErrorMessageStyles,
  ErrorStyles,
  HoodPersonStyles,
  InputNameTextFieldStyles,
  InstructionStyles,
  NameTextFieldStyles,
  SkullError,
  StartButtonStyles,
  WhoAreYouStyles,
} from "./PlayerDetailsStyle";

function PlayerDetails() {
  // Navigation hook
  const navigateToPlayerView = useNavigate();
  const navigateToHome = useNavigate();

  // name and role variables
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const isButtonDisabled = name.trim() === "" || role.trim() === "";

  // Functions to handle button click, currently uses state code, but the second to last line in the function
  // can be uncommented to use localStorage instead.
  const dispatch = useDispatch();
  const handleAdventureStart = () => {
    // dispatch(setPlayerName(name));
    // dispatch(setPlayerRole(role));
    localStorage.setItem("playerName", name);
    localStorage.setItem("playerRole", role);
    navigateToPlayerView("/PlayerView");
  };

  var hasGameCode = localStorage.getItem("gameCode") != null;

  return (
    <body
      style={{
        background: ourPalette.pageGradient,
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
          {hasGameCode ? (
            <SplitScreen leftSpace={1} rightSpace={3}>
              <div>
                <h1 style={WhoAreYouStyles}>Who Are You?</h1>
                <h3 style={InstructionStyles}>
                  Before you enter the game, inscribe your name and role below.
                </h3>
                <h4 style={EnterYourNameStyles}>Enter your Name</h4>
                <TextField
                  sx={NameTextFieldStyles}
                  InputProps={InputNameTextFieldStyles}
                  label="Name"
                  variant="filled"
                  color="secondary"
                  autoFocus={true}
                  fullWidth={true}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <h4 style={EnterYourRoleStyles}>Declare your Role</h4>
                <TextField
                  sx={NameTextFieldStyles}
                  InputProps={InputNameTextFieldStyles}
                  label="Role"
                  variant="filled"
                  color="secondary"
                  autoFocus={true}
                  fullWidth={true}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleAdventureStart}
                  disabled={isButtonDisabled}
                  sx={StartButtonStyles}
                >
                  Start Your Adventure
                </Button>
              </div>
              <div>
                <img src={character} alt="crashed" style={HoodPersonStyles} />
              </div>
            </SplitScreen>
          ) : (
            <>
              <center>
                <Typography variant="h1" style={ErrorStyles}>
                  Gamecode not found
                  <GiIcons.GiDeathSkull style={SkullError} />
                </Typography>
                <p style={ErrorMessageStyles}>
                  You don't appear to have a gamecode entered! Re-enter your
                  game code by clicking the button below!
                </p>
                <Button
                  variant="outlined"
                  style={ErrorButtonStyles}
                  onClick={() => {
                    navigateToHome("/");
                  }}
                >
                  Home
                </Button>
              </center>
            </>
          )}
        </ThemeProvider>
      </motion.div>
    </body>
  );
}

export default PlayerDetails;
