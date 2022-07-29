import * as React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function BarraSuperior() {
  
  const theme = createTheme({
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
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <AppBar>
      <Toolbar sx={{backgroundColor:'#39567C'}}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <VolunteerActivismIcon sx={{ mr: 2 }} style={{ color: "white" }} />
          <Typography
            display="inline"
            variant="h6"
            color="inherit"
            style={{ color: "white" }}
          >
            SkyDelight
          </Typography>
        </NavLink>
        <NavLink
          to="/login"
          style={{ marginLeft: "auto", textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            sx={{ margin: "2px",borderRadius:5 }}
            style={{
              color: "white",
              border: "1px solid white",
              textTransform: "none",
            }}
          >
            Iniciar Sesión
          </Button>
        </NavLink>
        <NavLink to="/signup" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{ margin: "10px" ,borderRadius:5 }}
            style={{
              color: "white",
              border: "1px solid white",
              textTransform: "none",
            }}
          >
            Regístrarse
          </Button>
        </NavLink>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}
