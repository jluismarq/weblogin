import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import {
    createTheme,
    ThemeProvider,
    responsiveFontSizes,
  } from "@mui/material/styles";

let theme = createTheme({
    palette: {
      mode: "light",
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      fontSize: 16,
    },
  });
  
  theme = responsiveFontSizes(theme);

export default function Error404() {
  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1">Error 404</Typography>
      <Typography variant="h6">
        La página que tu buscas no existe.
      </Typography>
      <NavLink
          to="/"
          style={{textDecoration: "none" }}
        >
      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 2,
          mb: 2,
          textTransform: "none",
          background: "#4979B8",
          borderRadius: 5,
        }}
      >
        Ir a inicio
      </Button>
    </NavLink>
    </Box>
    </ThemeProvider>
  );
}
