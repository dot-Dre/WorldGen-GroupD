import { createTheme } from '@mui/material/styles';

/**
 * This is a theme constant which should be wrapped around all styled MUI components
 * usage:
 *  import theme from 'path/to/here'
 *  <ThemeProvider theme={theme}>
 *      * Other Comps *
 *  </ThemeProvider>
 */
export const theme = createTheme({
    // Add more if needed
    palette: {
        primary: {
            main: "#7711C6"
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: "#92DF9B"
        },
        tertiary: {
            main: "#A40D08"
        }
    },
});

// USE THESE COLORS
export const ourPalette = {
    // Purple
    primary: "#7711C6",

    // Light Green
    secondary: "#00eb98",

    // Red I think
    tertiary: "#A40D08",

    // white
    white: "#FFFFFF",

    // dark grey
    disabled: "#9d82ab",

    // black
    black: "#000000",

    // dark grey
    blank:"#1a191c",

    // even darker grey
    blankDarker:"#111112",

    // light grey
    smooth:"#87868a",

    // The page background gradient
    pageGradient: "linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(37,27,93,1) 20%, rgba(0,0,0,1) 46%)",

    // The tab background gradient
    tabGradient: "linear-gradient(rgba(34,4,57,1) 8%, rgba(19,25,57,1) 29%, rgba(0,0,0,1) 100%)",

    // the modal gradient
    modalGradient: "linear-gradient(rgba(2,0,36,1) 0%, rgba(222,207,242,1) 0%, rgba(20,14,24,1) 96%)",

    sideButton: "#321e57",

    mapBackground: "#261f33",

    // These colors are the "map size" button border colors
    buttonBorders: {
        light: "#f2f207", // s
        base: "#b7ff00", // m
        dark: "#3fdb07" // l
    },

    // The main button background color (the dark grey)
    buttonColors: {
        primary: "#080114"
    }
};

export default theme;
