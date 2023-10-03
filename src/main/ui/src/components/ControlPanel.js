import React, { useState, useEffect } from "react";
import "./ControlPanel.css";
import { ourPalette } from "../Theme";
import Draggable from "react-draggable";
import FogOfWarSwitch from "./FogOfWarSwitch";
import UpdatePlayersButton from "./UpdatePlayersButton";

const ControlPanel = () => {
  const [fogOfWarOff, setFogOfWarOff] = useState(true);

  const handleFogOfWarChange = () => {
    setFogOfWarOff(!fogOfWarOff);
  };

  const handleUpdatePlayersClick = () => {
    // Hook it up with the websocket
  };

  return (
    <Draggable>
      <div
        className="control-panel"
        style={{ background: ourPalette.pageGradient }}
      >
        <FogOfWarSwitch checked={fogOfWarOff} onChange={handleFogOfWarChange} />
        <UpdatePlayersButton />
      </div>
    </Draggable>
  );
};

export default ControlPanel;
