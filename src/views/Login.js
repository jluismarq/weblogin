import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BarraSuperior from "../components/BarraSuperior";
import { NavLink } from "react-router-dom";
import { Formik ,Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

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
  
  
  const handleSubmit = (values,props) => {
    console.log(values);

    fetch("https://apiskydelight.herokuapp.com/usuarios/token/obtener/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
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

 const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    email: Yup
      .string('Ingrese su email')
      .email('Ingrese un email válido')
      .required('El campo email es requirido'),
    password: Yup
      .string('Ingrese su contraseña')
      .min(8, 'La contraseña debe tener un minimo de 8 caracteres de longitud')
      .required('El campo contraseña es requirido'),
  });

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
          
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {(props) => ( 
         <Form>
         <Box
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              required
              value={props.values.email}
              onChange={props.handleChange}
              error={props.touched.email && Boolean(props.errors.email)}
              helperText={<ErrorMessage name='email'/>}
            />
            <TextField
              margin="normal"
              fullWidth
              placeholder="Ingrese su contraseña"
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              value={props.values.password}
              onChange={props.handleChange}
              error={props.touched.password && Boolean(props.errors.password)}
              helperText={<ErrorMessage name='password'/>}
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
                  <NavLink to="/forgot" style={({ fontWeight:"normal", fontSize:"0.875em",color:"#0645AD"})}>¿Ólvido su contraseña?</NavLink>
              </Grid>
              <Grid item>
                  <NavLink to="/signup" style={({ fontWeight:"normal", fontSize:"0.875em", color:"#0645AD"})}>
                    {"¿No tienes cuenta? Regístrate"}
                  </NavLink>
              </Grid>
            </Grid>
          </Box>
          </Form>
          )}
        </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
