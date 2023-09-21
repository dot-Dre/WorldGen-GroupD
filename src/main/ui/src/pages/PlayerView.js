import React from "react";
import { Container, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Lottie from "lottie-react";
import animationData from "./assets/overlay.json";
import theme from "../Theme";
import PlayerList from "../components/PlayerList";
import data from "./testData/mockPlayers.json";

function PlayerView() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0}>
        {/* Control Panel on the left */}
        <Grid
          item
          xs={3}
          style={{
            backgroundColor: "#E0E0E0",
            borderRight: "2px solid #3C3C3C",
          }}
        >
          <Container
            style={{
              width: "80%",
              textAlign: "center",
              color: "#3C3C3C",
              paddingTop: "50px",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <PlayerList
                initialData={data}
                height={"46vh"}
                gameID={123123123}
                isDMView={false}
              />
            </div>
          </Container>
        </Grid>
        {/* Game Window on the right */}
        <Grid item xs={9}>
          <div style={{ width: "100%", height: "100vh", position: "relative" }}>
            <Lottie
              animationData={animationData}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default PlayerView;
