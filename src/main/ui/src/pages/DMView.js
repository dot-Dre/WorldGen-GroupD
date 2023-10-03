import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";
import PlayerList from "../components/PlayerList";
import { ourPalette } from "../Theme";
import { motion } from "framer-motion";
import * as IoIcon from "react-icons/io5";
import "./DMView.css";
import dummy from "./assets/testMap.png";
import { Typography, Dialog, DialogTitle } from "@mui/material";
import PlayerIcon from "../components/PlayerIcon";
import MapPin from "../components/MapPin";
import ControlPanel from "../components/ControlPanel";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import StompJs from "stompjs";

function calculateRandomPlayerPosition(centerX, centerY, radius) {
  // Generate a random angle and distance within the radius
  const randomAngle = Math.random() * 2 * Math.PI;
  const randomDistance = Math.random() * radius;

  // Calculate x and y positions based on random angle and distance
  const x = centerX + randomDistance * Math.cos(randomAngle);
  const y = centerY + randomDistance * Math.sin(randomAngle);

  return { x, y };
}

function showGreeting(greeting) {
  alert(greeting);
}

function DMView() {
  const [show, setShow] = useState(true);
  const [showPopup, setShowPopup] = useState(true);
  const [players, setPlayers] = useState([]);
  const [displayMap, setDisplayMap] = useState(
    useSelector((state) => state.mapState.map)
  );

  const mapPinX = 400;
  const mapPinY = 400;
  const radius = 75;

  const mapJson = {
    //TODO send this shit to server on game start
    map: displayMap,
  };

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

  // // Map over data array and generate a random position for each player
  // const players = data.map((player) => ({
  //   id: player.id,
  //   position: calculateRandomPlayerPosition(mapPinX, mapPinY, radius),
  // }));

  // Establish a Web Socket Connection on Page Load
  useEffect(() => {
    // Create a SockJS WebSocket instance and connect with http handshake
    var socket = new SockJS("http://localhost:8080/ws"); //This is Fine in the DMView just not in the PlayerView
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
        JSON.stringify({ name: "Dungeon Master Finn" })
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
          <ControlPanel />
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
                // initialData={data}
                initialData={players}
                gameID={"234-900-001"}
                isDMView={true}
              />
            </div>
          </nav>
          <div style={tabImgStyle}>
            {players.map((player) => (
              <PlayerIcon
                key={player.id}
                initialX={player.position.x}
                initialY={player.position.y}
              />
            ))}
            <MapPin initialX={mapPinX} initialY={mapPinY} size={40} />
            <img src={dummy} imgWidth={"70vw"} imgHeight={"90vh"} />
          </div>
        </ThemeProvider>
      </motion.div>
      <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
        <DialogTitle>
          Dragging the Pin will change where players spawn in
        </DialogTitle>
      </Dialog>
    </body>
  );
}

export default DMView;
