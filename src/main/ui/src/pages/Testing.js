import React, { useState } from "react";
import './Testing.css';
import PlayerIcon from "../components/PlayerIcon";
import MapPin from "../components/MapPin";
import { Dialog, DialogTitle } from "@mui/material";

  function Testing() {
    const [showPopup, setShowPopup] = useState(true);

    return (
      <body>
        <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
          <DialogTitle>
            Click anywhere on the map to select a starting area
          </DialogTitle>
        </Dialog>
        <div>
        <PlayerIcon id={1} initialX={300} initialY={400} />
        <PlayerIcon id={2} initialX={500} initialY={400} />
        <MapPin initialX={200} initialY={200} size={40} />
      </div>
      </body>
    );
  };

export default Testing;
