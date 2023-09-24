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
      size: props.size || 35,
    };
  }

  handleDrag = (_e, d) => {
    const { x, y } = this.state.position;
    this.setState({
      position: {
        x: x + d.deltaX,
        y: y + d.deltaY,
      }
    });
  };

  render() {
    const { position, size } = this.state;
    return (
      <Draggable onDrag={this.handleDrag} position={position}>
      <div className="draggable-wrapper">
        <RiIcon.RiMapPinFill size={size} color={ourPalette.tertiary} />
      </div>
    </Draggable>
    );
  }
}

export default MapPin;
