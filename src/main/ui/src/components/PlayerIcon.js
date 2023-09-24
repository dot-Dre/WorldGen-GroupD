import React from "react";
import Draggable from "react-draggable";
import "./DraggableIcon.css";
import * as RiIcon from "react-icons/ri";

class PlayerIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id || -1,
      position: {
        x: props.initialX || 0,
        y: props.initialY || 0,
      },
      size: props.size || 40,
    };
  }

  getRandomColor() {
    const letters = "0123456789ABCDEF"; // Hexadecimal characters
    let color = "#"; // Start with a '#' symbol

    // Generate six random hexadecimal digits
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]; // Append a random character
    }

    return color;
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
    const { id, position, size } = this.state;
    return (
      <Draggable onDrag={this.handleDrag} position={position}>
      <div className="draggable-wrapper">
        {/* <p>Drag position for ID {id}:</p>
        <div>
          <strong>x: {position.x.toFixed(0)}</strong>
          <strong> y: {position.y.toFixed(0)}</strong>
        </div> */}
        <RiIcon.RiMapPinFill size={size} color={this.getRandomColor()} />
      </div>
    </Draggable>
    );
  }
}

export default PlayerIcon;
