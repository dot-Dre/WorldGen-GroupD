import { ourPalette } from "../Theme";

export const WhoAreYouStyles = {
  color: ourPalette.secondary,
  fontFamily: "monospace",
  fontSize: "7vh",
  marginLeft: "7vw",
  marginTop: "25%",
};

export const InstructionStyles = {
  color: ourPalette.white,
  fontFamily: "monospace",
  marginLeft: "7vw",
};

export const EnterYourNameStyles = {
  color: ourPalette.white,
  marginTop: "9vh",
  marginLeft: "7vw",
  fontFamily: "Monospace",
};

export const NameTextFieldStyles = {
  input: {
    color: ourPalette.white,
    backgroundColor: ourPalette.blank,
  },
  label: {
    color: ourPalette.white,
    fontFamily: "monospace",
  },
  marginLeft: "7vw",
};

export const InputNameTextFieldStyles = {
  style: {
    color: ourPalette.white,
    fontFamily: "monospace",
    fontSize: "90%",
  },
};

export const EnterYourRoleStyles = {
  color: ourPalette.white,
  marginTop: "4vh",
  marginLeft: "7vw",
  fontFamily: "monospace",
};

export const StartButtonStyles = {
  marginLeft: "7vw",
  marginTop: "5vh",
  fontFamily: "Monospace",
  "&.Mui-disabled": {
    borderColor: ourPalette.disabled,
    color: ourPalette.disabled, // Text color in disabled state
  },
  "&:hover": {
    borderColor: ourPalette.primary,
    color: ourPalette.primary,
  },
};

export const HoodPersonStyles = {
  marginLeft: "33vw",
  marginTop: "7vh",
  width: "60%",
  height: "60%",
};

export const ErrorStyles = {
  fontFamily: "monospace",
  color: ourPalette.secondary,
  fontWeight: "bold",
  marginTop:"15%"
}

export const ErrorMessageStyles = {
  fontFamily: "monospace",
  color:ourPalette.white
}

export const ErrorButtonStyles = {

}

export const SkullError = {
  marginLeft: "6%"
}
