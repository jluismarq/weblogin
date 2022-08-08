import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BarraSuperior from "../components/BarraSuperior";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { NavLink } from "react-router-dom";
import {crearUsuario} from "../entities/users";

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

export default function SignUp() {
 
  const [sex, setSex] = React.useState("");

  const handleChange = (event) => {
    setSex(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      edad: data.get("edad"),
      sex: data.get("sex"),
      password: data.get("password"),
    });


    crearUsuario( 
    {
      name: data.get("name"),
      email: data.get("email"),
      edad: parseInt(data.get("edad"), 10),
      sex: data.get("sex"),
      password: data.get("password"),
    }).then((jsonResponse) => {
      localStorage.setItem("access", jsonResponse.access);
      localStorage.setItem("refresh", jsonResponse.refresh);
    }); 


};

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
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
          <Avatar sx={{ m: 1, bgcolor: "#4979B8" }}></Avatar>
          <Typography component="h1" variant="h5">
            Regístrate
          </Typography>
          <Typography>LLena los siguientes campos para registrarte</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >

            <Grid container spacing={2}>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  placeholder="Ingrese su Nombre Completo"
                  id="name"
                  label="Nombre"
                  name="name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  placeholder="Ingrese su Email"
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  required
                  fullWidth
                  placeholder="Ingrese su Edad"
                  id="edad"
                  label="Edad"
                  name="edad"
                  type="number"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="sex">Sexo</InputLabel>
                  <Select
                    labelId="sex"
                    name="sex"
                    id="sex"
                    value={sex}
                    label="Sexo"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Masculino"}>Masculino</MenuItem>
                    <MenuItem value={"Femenino"}>Femenino</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  placeholder="Ingrese su Contraseña"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirme su Contraseña"
                  type="password"
                  id="confirm-password"
                  placeholder="Confirme su Contraseña"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 1,
                    textTransform: "none",
                    background: "#4979B8",
                    borderRadius: 5,
                  }}
                >
                  Regístrame
                </Button>
              </Grid>
              
              <Grid container justifyContent="flex-end">
                <Grid item>
                    <NavLink to="/login"  href="#" style={({ fontWeight:"normal", fontSize:"0.875em", color:"#0645AD"})}>
                      ¿Ya tienes una cuenta? Inicia Sesión
                    </NavLink>
                </Grid>
              </Grid>

            </Grid>
          </Box>
        
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
