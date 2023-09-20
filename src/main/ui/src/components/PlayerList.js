import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "./PlayerList.css";

const PlayerList = ({ initialData, height, sx, }) => {
  const [data, setData] = useState(initialData);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const handleClickOpen = (player) => {
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
    backgroundColor: "#FFFFFF",
    borderRadius: "4px",
    ...(sx || {}),
  };

  const dialogStyle = {
    innerBackgroundColor: "#FFFFFF",
    outerBackgroundColor: "#339e7a",
  }

  return (
    <div>
      <List style={listStyle}>
        {data.map((item, index) => (
          <ListItem key={index} onClick={() => handleClickOpen(item)}>
            <ListItemButton color="primary" style={{ fontFamily: "monospace", borderRadius: "4px" }}>
              <ListItemText
                primary={<span style={{ fontFamily: 'monospace' }}>{item.name}</span>}
                secondary={
                  <React.Fragment>
                    <span style={{ fontFamily: 'monospace' }}>Role: {item.role}</span>
                    <br />
                    <span style={{ fontFamily: 'monospace' }}>Status: {item.status}</span>
                  </React.Fragment>
                }
              />
              <div style={{ marginLeft: "auto", fontFamily: "monospace" }}>
                X: {item.x}, Y: {item.y}
              </div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleClose} style={{ fontFamily: 'monospace' }}>
        <DialogTitle style={{backgroundColor: dialogStyle.outerBackgroundColor, fontFamily: 'monospace'}}>Change Status</DialogTitle>
        <DialogContent style={{backgroundColor: dialogStyle.innerBackgroundColor}}>
          {selectedPlayer && (
            <div>
              <p>Player: {selectedPlayer.name}</p>
              <p>Current Status: {selectedPlayer.status}</p>
              <p>Change Status:</p>
              <input
                style={{fontFamily: 'monospace'}}
                type="text"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions style={{backgroundColor: dialogStyle.outerBackgroundColor}}>
          <Button onClick={handleChangeStatus} color="primary" variant="outlined">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlayerList;
