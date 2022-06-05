import { createTheme, responsiveFontSizes } from "@mui/material";
import NotoSerifBold from "../assets/fonts/NotoSerifJP-Bold.otf";
import NotoSerifRegular from "../assets/fonts/NotoSerifJP-Regular.otf";
import NotoSerifSemiBold from "../assets/fonts/NotoSerifJP-SemiBold.otf";

const breakpointValues = {
  xs: 425,
  sm: 768,
  md: 1040,
  lg: 1440,
  xl: 1920,
};

const defaultTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
            @font-face {
                font-family: 'NotoSerif',
                font-style: normal;
                font-display: swap;
                src: local('NotoSerifBold'), url(${NotoSerifBold}) format('woff');
            }
          `,
    },
  },
  breakpoints: {
    values: breakpointValues,
  },
});

export const theme = responsiveFontSizes(defaultTheme);
