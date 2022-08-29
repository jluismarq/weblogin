import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { useAlert } from "../hooks/useAlert";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

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

export default function Login() {
  const auth = useAuth();
  const alert = useAlert();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un email válido")
      .max(50, "Solo soportamos hasta 50 caracteres")
      .required("El campo email es requirido"),
    password: Yup.string()
      .matches(/^\S*$/, "Los espacios en blanco no son permitidos")
      .min(8, "La contraseña debe tener un mínimo de 8 caracteres de longitud")
      .max(50, "Solo soportamos hasta 50 caracteres")
      .required("El campo contraseña es requirido"),
  });

  const handleSubmit = (values, props) => {
    auth
      .signin({
        email: values.email,
        password: values.password,
      })
      .then(() => {
        navigate("/", { replace: true });
        alert.createAlert({severity:"success", message:"Autenticado correctamente"});
      }).catch(error => {
        console.log(error);
        alert.createAlert({severity:"error", message:" " + error});
        props.setSubmitting(false);
      });
  };
  

  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Typography>¡Qué bueno que volviste!</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    placeholder="ejemplo@mail.com"
                    required
                    value={props.values.email}
                    onChange={props.handleChange}
                    error={props.touched.email && Boolean(props.errors.email)}
                    helperText={<ErrorMessage name="email" />}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    placeholder="AbC123#*"
                    name="password"
                    label="Contraseña"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    required
                    value={props.values.password}
                    onChange={props.handleChange}
                    error={
                      props.touched.password && Boolean(props.errors.password)
                    }
                    helperText={<ErrorMessage name="password" />}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyOutlinedIcon fontSize="small" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton fontSize="small"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={props.isSubmitting}
                    sx={{
                      mt: 2,
                      mb: 2,
                      textTransform: "none",
                      background: "#4979B8",
                      borderRadius: 5,
                    }}
                  >
                    {props.isSubmitting
                      ? "Iniciando Sesion..."
                      : "Iniciar Sesion"}
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <NavLink
                        to="/forgot"
                        style={{
                          fontWeight: "normal",
                          fontSize: "0.875em",
                          color: "#0645AD",
                        }}
                      >
                        ¿Ólvido su contraseña?
                      </NavLink>
                    </Grid>
                    <Grid item>
                      <NavLink
                        to="/signup"
                        style={{
                          fontWeight: "normal",
                          fontSize: "0.875em",
                          color: "#0645AD",
                        }}
                      >
                        {"¿Sin cuenta? Crea una"}
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
