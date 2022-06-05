import React, { memo } from "react";
import { createGenerateClassName, StylesProvider } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from "../components/Header/Header";
import { MainPage } from "../pages/MainPage";
import { ThemeProvider } from "@mui/material";
import { theme } from "../themes/theme";

const generatedCN = createGenerateClassName({
  disableGlobal: true,
  productionPrefix: "t",
});

export const Layout = memo(() => {
  return (
    <StylesProvider generateClassName={generatedCN} injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <MainPage />
      </ThemeProvider>
    </StylesProvider>
  );
});
