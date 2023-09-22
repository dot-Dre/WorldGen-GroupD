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

export const ourPalette = {
    primary: "#7711C6",
    secondary: "#92DF9B",
    tertiary: "#A40D08",
    white: "#FFFFFF",
    disabled: "#9d82ab",
    black: "#000000",
    blank:"#1a191c",
    blankDarker:"",
    smooth:"#87868a",
    pageGradient: "linear-gradient(90deg, rgba(20,5,46,1) 21%, rgba(0,0,0,1) 50%)",
    tabGradient: "linear-gradient(rgba(20,5,46,1) 21%, rgba(0,0,0,1) 50%)",
    modalGradient: "linear-gradient(rgba(2,0,36,1) 0%, rgba(222,207,242,1) 0%, rgba(20,14,24,1) 96%)",

    buttonBorders: {
        light: "#f2f207",
        base: "#b7ff00",
        dark: "#3fdb07"
    },

    buttonColors: {
        primary: "#080114"
    }
};

export default theme;
