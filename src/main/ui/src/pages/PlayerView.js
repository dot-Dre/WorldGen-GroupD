import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";
import PlayerList from "../components/PlayerList";
import { ourPalette } from "../Theme";
import { motion } from "framer-motion";
import * as IoIcon from "react-icons/io5";
import "./PlayerView.css";
import TransformImage from "../components/TransformImage";
import dummy from "./assets/gen.gif";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import StompJs from "stompjs";

function showGreeting(greeting) {
  alert(greeting);
}

function PlayerView() {
  const [show, setShow] = useState(true);
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState(
    useSelector((state) => state.nameState.name)
  );
  const [playerRole, setPlayerRole] = useState(
    useSelector((state) => state.roleState.role)
  );

  const reveal = () => {
    setShow(!show);
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

  // Establish a Web Socket Connection on Page Load
  useEffect(() => {
    // Create a SockJS WebSocket instance and connect with http handshake
    // FIXME make this use the server's ip that the user enter, this only works for testing on same pc
    var socket = new SockJS("http://localhost:8080/ws");
    const client = StompJs.over(socket);

    // Connect to the WebSocket server
    client.connect({}, () => {
      // Setup Subscriptions ASAP
      client.subscribe("/topic/greetings", (greeting) => {
        showGreeting(JSON.parse(greeting.body).content);
      });
      client.subscribe("/topic/newPlayers", (newPlayer) => {
        setPlayers((prevPlayers) => {
          const playerToAppend = {
            id: newPlayer.id,
            name: newPlayer.name,
            role: newPlayer.role,
            status: newPlayer.status,
          };
          return [...prevPlayers, playerToAppend];
        });
      });

      // Send a message to the server
      client.send(
        "/app/hello",
        {},
        JSON.stringify({ name: "Player Finn", role: "role" })
      );
      client.send(
        "/app/joinGame",
        {},
        JSON.stringify({ name: playerName, role: playerRole }) // TODO test me and ask dre about it
      );
    });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <body style={{ background: ourPalette.black, overflow: "hidden" }}>
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
              Game ID:
            </Typography>
            <div>
              <PlayerList
                initialData={players}
                gameID={localStorage.getItem("gameCode")}
              />
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
