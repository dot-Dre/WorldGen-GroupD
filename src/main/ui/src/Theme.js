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
    pageGradient: "linear-gradient(#34283d 5%, #000000 95%)",
    // firstGradient: "linear-gradient()",
};

export default theme;
