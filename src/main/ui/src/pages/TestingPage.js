import React from "react";
import PlayerIcon from "../components/PlayerIcon";
import MapPin from "../components/MapPin";

class TestingPage extends React.Component {
  render() {
    return (
      <div>
        <PlayerIcon id={1} initialX={300} initialY={400} />
        <PlayerIcon id={2} initialX={500} initialY={400} />
        <MapPin initialX={200} initialY={200}/>
      </div>
    );
  }
}

export default TestingPage;
