import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Notes from "../components/Notes";
import { ourPalette } from "../Theme";
import "./PlayerList.css";

const PlayerList = ({ initialData, height, sx, gameID, isDMView }) => {
  const [data, setData] = useState(initialData);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const handleClickOpen = (player) => {
    if (!isDMView) {
      return
    }
    setSelectedPlayer(player);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChangeStatus = () => {
    if (selectedPlayer) {
      const updatedData = data.map((item) => {
        if (item === selectedPlayer) {
          return { ...item, status: newStatus };
        }
        return item;
      });
      setData(updatedData);
      setOpenDialog(false);
    }
    setNewStatus("");
  };

  const listStyle = {
    height: height,
    overflowY: "auto",
    backgroundColor: ourPalette.blank,
    borderRadius: "2px",
    ...(sx || {}),
    marginLeft: "calc((100% - 135%) / 2)",
    marginRight: "calc((100% - 135%) / 2)",
    width: "auto",
    maxWidth: "150%",
  };

  const playersTypographyStyle = {
    fontFamily: "Monospace",
    fontWeight: "Bold",
    textAlign: "left",
    marginLeft: "calc((100% - 135%) / 2)",
    padding: "3vh 0px 1.2vh 0px",
    color: ourPalette.white
  };

  const gameIDTypographyStyle = {
    // textTransform: "uppercase",
    fontFamily: "Monospace",
    fontWeight: "Bold",
    textAlign: "left",
    color: ourPalette.secondary,
    fontSize: "3.5vh",
    marginLeft: -30,
    marginTop: 0,
  };

  const gameIDNumberTypographyStyle = {
    fontFamily: "Monospace",
    // fontWeight: "Bold",
    color: ourPalette.white,
    textAlign: "left",
    marginLeft: -30,
    marginTop: -10,
  };

  const dialogStyle = {
    innerBackgroundColor: "#FFFFFF",
    outerBackgroundColor: "#339e7a",
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom style={gameIDTypographyStyle} >
        Game ID:
      </Typography>
      <Typography style={gameIDNumberTypographyStyle}>{gameID}</Typography>
      <Notes />
      <Typography variant="h6" style={playersTypographyStyle}>
        {isDMView ? "Players" : "Party"}
      </Typography>
      <List style={listStyle}>
        {data.map((item, index) => (
          <ListItem key={index} onClick={() => handleClickOpen(item)}>
            <ListItemButton
              color="primary"
              style={{ fontFamily: "monospace", borderRadius: "4px", color: ourPalette.white, }}
              sx={{
                '&:hover': {
                  backgroundColor: ourPalette.black // Change this to your desired hover color
                },
              }}
            >
              <ListItemText
                primary={
                  <span style={{ fontFamily: "monospace", fontSize: "0.6vw", }}>
                    {item.name}
                  </span>
                }
                secondary={
                  <React.Fragment>
                    <span
                      style={{ fontFamily: "monospace", fontSize: "0.6vw", color:ourPalette.smooth }}
                    >
                      Role: {item.role}
                    </span>
                    <br />
                    <span
                      style={{ fontFamily: "monospace", fontSize: "0.6vw", color:ourPalette.smooth }}
                    >
                      Status: {item.status}
                    </span>
                  </React.Fragment>
                }
              />
              <div
                style={{
                  marginLeft: "auto",
                  fontFamily: "monospace",
                  fontSize: "0.5vw",
                  marginTop: "-5vh",
                }}
              >
                <div>X: {item.x}</div>
                <div>Y: {item.y}</div>
              </div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        style={{ fontFamily: "monospace" }}
      >
        <DialogTitle
          style={{
            backgroundColor: dialogStyle.outerBackgroundColor,
            fontFamily: "monospace",
          }}
        >
          Change Status
        </DialogTitle>
        <DialogContent
          style={{ backgroundColor: dialogStyle.innerBackgroundColor }}
        >
          {selectedPlayer && (
            <div>
              <p>Player: {selectedPlayer.name}</p>
              <p>Current Status: {selectedPlayer.status}</p>
              <p>Change Status:</p>
              <input
                style={{ fontFamily: "monospace" }}
                type="text"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions
          style={{ backgroundColor: dialogStyle.outerBackgroundColor }}
        >
          <Button
            onClick={handleChangeStatus}
            color="primary"
            variant="outlined"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlayerList;
