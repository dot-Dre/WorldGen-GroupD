import React, { useState } from "react";
import { ThemeProvider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { ourPalette } from "../Theme";
import theme from "../Theme";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const ControlPanel = ({ }) => {

    const handleUpdatePlayersClick = () => {
        // Hook it up with the websocket
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                size="large"
                style={{
                    color: ourPalette.primary,
                    borderRadius: "2px",
                    borderColor: ourPalette.primary,
                    backgroundColor: ourPalette.black,
                    width: "100%",
                    fontFamily: "Monospace",
                }}
                onClick={handleUpdatePlayersClick}
                onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = ourPalette.secondary;
                    e.currentTarget.style.color = ourPalette.secondary;
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = ourPalette.primary;
                    e.currentTarget.style.color = ourPalette.primary;
                }}
            >
                Send your Changes to the Players
            </Button>
        </div>
    );
};

export default ControlPanel;
