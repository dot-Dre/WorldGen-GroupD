import React from "react";
import Draggable from "react-draggable";
import { ourPalette } from "../Theme";
import "./DraggableIcon.css";
import * as RiIcon from "react-icons/ri";

class MapPin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        x: props.initialX || 0,
        y: props.initialY || 0,
      },
      size: props.size || 40,
      color: ourPalette.tertiary,
    };
  }

  handleDrag = (_e, d) => {
    const { x, y } = this.state.position;
    const newX = x + d.deltaX;
    const newY = y + d.deltaY;

    this.setState({
      position: {
        x: newX,
        y: newY,
      },
    });
  };

  render() {
    const { position, size, color } = this.state;
    return (
      <Draggable onDrag={this.handleDrag} position={position}>
        <div className="draggable-wrapper">
          <RiIcon.RiMapPinFill size={size} color={color} />
        </div>
      </Draggable>
    );
  }
}

export default MapPin;
