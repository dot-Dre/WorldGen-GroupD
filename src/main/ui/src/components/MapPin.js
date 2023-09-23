import React, { useState } from "react";
import Draggable from "react-draggable";
import "./DraggableIcon.css";
import * as FaIcon from "react-icons/fa6";
import * as RiIcon from "react-icons/ri";

const MapPin = ({ initialX, initialY }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });

  const handleDrag = (_e, d) => {
    setPosition({
      x: position.x + d.deltaX,
      y: position.y + d.deltaY,
    });
  };

  return (
    <Draggable onDrag={handleDrag} position={position}>
      <div className="draggable-wrapper">
        <FaIcon.FaFeatherPointed />
        {/* <RiIcon.RiMapPinFill /> */}
      </div>
    </Draggable>
  );
};

export default MapPin;
