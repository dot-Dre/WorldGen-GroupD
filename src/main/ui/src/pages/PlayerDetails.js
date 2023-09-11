import React, { useState } from "react";
import { SplitScreen } from "../components/SplitScreen";
import { ThemeProvider } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";
import theme from "../Theme";
import "./PlayerDetails.css";
import lostEyes from "./assets/lostEyes.gif";
import monsters from "./assets/monsters.gif";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setPlayerName } from "../slices/playerNameSlice";
import { setRole } from "../slices/roleSlice";

function PlayerDetails() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  // Function to handle button click
  const handleAdventureStart = () => {
    dispatch(setPlayerName(name))
    dispatch(setRole(role))
  };

  const isButtonDisabled = name.trim() === "" || role.trim() === "";

  return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
    >
      <ThemeProvider theme={theme}>
        <SplitScreen leftSpace={1} rightSpace={3}>
          <div>
            <h1 style={{ color: "#bdffcf" }} className="title-text">
              Who Are You?
            </h1>
            <h3 style={{ color: "#ffffff" }} className="help-text">
              Before you enter the game, inscribe your name and role below.
            </h3>

            <h4
              style={{ color: "#ffffff", marginTop: "9vh", marginLeft: "7vw" }}
            >
              Enter your Name
            </h4>
            <TextField
              sx={{
                input: {
                  color: "#ffffff",
                },
                marginLeft: "7vw",
                marginTop: "",
              }}
              label="Name"
              variant="outlined"
              color="secondary"
              autoFocus={true}
              className="text-field"
              fullWidth={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <h4
              style={{ color: "#ffffff", marginTop: "4vh", marginLeft: "7vw" }}
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
              label="Role"
              variant="outlined"
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
                "&.Mui-disabled": {
                  borderColor: "#9d82ab",
                  color: "#9d82ab", // Text color in disabled state
                },
                "&:hover": {
                  borderColor: "#92DF9B",
                  color: "#92DF9B",
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
          </div>
        </SplitScreen>
      </ThemeProvider>
    </motion.div>
  );
}

export default PlayerDetails;
