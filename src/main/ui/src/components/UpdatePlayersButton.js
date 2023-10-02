import React from "react";
import Button from "@mui/material/Button";
import { ourPalette } from "../Theme";

const UpdatePlayersButton = () => {
  const handleUpdatePlayersClick = () => {
    // Hook it up with the websocket
  };

  return (
    <Button
      className="update-button"
      variant="outlined"
      color="primary"
      size="large"
      style={{
        color: ourPalette.primary,
        borderColor: ourPalette.primary,
        backgroundColor: ourPalette.black,
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
      Update Players
    </Button>
  );
};

export default UpdatePlayersButton;
