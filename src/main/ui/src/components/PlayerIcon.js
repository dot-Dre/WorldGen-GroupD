import React, { useState } from "react";
import Draggable from "react-draggable";
import "./DraggableIcon.css";

const PlayerIcon = ({ id, initialX, initialY }) => {
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
        <p>Drag position for ID {id}:</p>
        <div>
          <strong>x: {position.x}</strong>
          <strong> y: {position.y}</strong>
        </div>
      </div>
    </Draggable>
  );
};

export default PlayerIcon;
