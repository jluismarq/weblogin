import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BarraSuperior from "../components/BarraSuperior";
import { NavLink } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      SkyDelight {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    fontSize: 16,
  },
});

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const headers = new Headers();
    //   headers.append("KEY-CLIENT", localStorage.getItem("access"));
    //headers.append("Content-Type", "application/json");
    //headers.append("Access-Control-Allow-Origin", "*");
    fetch("https://apiskydelight.herokuapp.com/usuarios/token/obtener/", {
      // headers:,
      method: "POST",
      //mode: "cors",
      //   headers: {
      //     "KEY-CLIENT": localStorage.getItem("access"), // Peticion autenticada
      //     "Access-Control-Allow-Origin": "*",
      //   },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    });
    //.then((jsonResponse) => {
    // localStorage.setItem("access", jsonResponse.access);
    // localStorage.setItem("refresh", jsonResponse.refresh);
    // });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <BarraSuperior />
        <Box
          sx={{
            marginTop: 11,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#4979B8" }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="Ingrese su email"
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="Ingrese su contraseña"
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                mb: 2,
                textTransform: "none",
                background: "#4979B8",
                borderRadius: 5,
              }}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                  <NavLink to="/forgot" style={({ fontWeight:"normal"})}>¿Ólvido su contraseña?</NavLink>
              </Grid>
              <Grid item>
                  <NavLink to="/signup" style={({ fontWeight:"normal"})}>
                    {"¿No tienes cuenta? Regístrate"}
                  </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
