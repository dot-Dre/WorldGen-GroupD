import { ourPalette } from "../Theme";

export const HomeBody = {
  background: ourPalette.pageGradient,
  overflow: "hidden",
  backgroundSize: "cover",
  height: "100vh",
};

export const LogoStyles = {
  marginLeft: "5%",
  width: "67%",
  height: "67%"
};

export const EnterIDStyles = {
  color: ourPalette.white,
  fontFamily: "Monospace",
  marginLeft: "15%",
  marginTop: "",
};

export const CodeFieldStyles = {
  // same as style prop
  input: {
    color: ourPalette.white,
  },
  backgroundColor: ourPalette.blank,
  marginLeft: "15%",

};

export const RocketButtonStyles = {
  "&.Mui-disabled": {
    borderColor: "#9d82ab",
    color: "#9d82ab", // Text color in disabled state
  },
  marginLeft: "2%",
  // maxHeight: "90%",
  height: "6.7vh"
};

export const EnterHelpStyles = {
  marginLeft: "15%",
  marginTop: "2vh",
  fontFamily: "Monospace",
  color: ourPalette.white,
};

export const GenerateTextStyles = {
  color: ourPalette.white,
  fontFamily: "Monospace",
  marginLeft: "15%",
  marginTop: "5%",
};

export const CreateButtonStyles = {
  marginLeft: "15%",
};

export const CreateButtonTextStyles = {
  fontFamily: "Monospace",
  fontSize: "2vh",
};

export const LoadTextStyles = {
  color: ourPalette.white,
  fontFamily: "Monospace",
  marginLeft: "15%",
};

export const LoadButtonStyles = {
  marginLeft: "15%",
};

export const LoadButtonTextStyles = {
  fontFamily: "Monospace",
  fontSize: "2vh",
};

export const DescriptionTextStyles = {
  color: ourPalette.white,
  marginLeft: "15%",
  fontFamily: "monospace",
};

export const LeftImageStyles = {
  marginLeft: "2vw",
  marginTop: "20vh",
  width: "35vw",
  height: "60vh",
};
