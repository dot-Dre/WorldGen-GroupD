import React from "react";
import Draggable from "react-draggable";
import "./DraggableIcon.css";

class PlayerIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id || -1,
      position: {
        x: props.initialX || 0,
        y: props.initialY || 0,
      },
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
    const { id, position } = this.state;
    return (
      <Draggable onDrag={this.handleDrag} position={position}>
      <div className="draggable-wrapper">
        <p>Drag position for ID {id}:</p>
        <div>
          <strong>x: {position.x}</strong>
          <strong> y: {position.y}</strong>
        </div>
      </div>
    </Draggable>
    );
  }
}

export default PlayerIcon;
