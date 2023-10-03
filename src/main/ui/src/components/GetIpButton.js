import { Button, Typography } from "@mui/material";
import * as BiIcons from "react-icons/bi";

import { ourPalette } from "../Theme";

export const GetIPButton = ({ sx }) => {
  const handleClick = () => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        // Get the IPv4 address
        var ipv4Address = data.ip;

        // Copy the IPv4 address to clipboard
        navigator.clipboard.writeText(ipv4Address);
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error);
      });
  };

  return (
    <Button
      variant="outlined"
      sx={sx}
      onClick={() => {
        handleClick();
      }}
    >
      <Typography
        variant="p"
        sx={{ fontFamily: "monospace", color: ourPalette.white }}
      >
        IP Address
      </Typography>
      <BiIcons.BiGlobe style={{ color: ourPalette.white, marginLeft: "0.5vw" }} />
    </Button>
  );   
};

export default GetIPButton;
