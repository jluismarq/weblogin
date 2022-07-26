import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../hooks/useAuth";
import { useAlert } from "../hooks/useAlert";
import Link from "@mui/material/Link";

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

export default function Forgot() {
  const auth = useAuth();
  const alert = useAlert();

  const handleSubmit = (values, props) => {
    console.log(values);
    auth
      .sendPasswordResetEmail(values.email)
      .then(() => {
        alert.createAlert({
          severity: "success",
          message: "Revisa tu correo para recuperar tu contraseña",
        });
        props.resetForm();
        props.setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        alert.createAlert({ severity: "error", message: " " + error });
        props.resetForm();
        props.setSubmitting(false);
      });
  };

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un email válido")
      .max(50, "Solo soportamos hasta 50 caracteres")
      .required("El campo email es requirido"),
  });

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
            <QuestionMarkIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align="center">
            Recuperar Contraseña
          </Typography>
          <Typography align="center">
            Ingresa el email con el que te registraste
          </Typography>

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
                    required
                    fullWidth
                    placeholder="ejemplo@mail.com"
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
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

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!props.dirty || props.isSubmitting}
                    sx={{
                      mt: 2,
                      mb: 2,
                      textTransform: "none",
                      background: "#4979B8",
                      borderRadius: 5,
                    }}
                  >
                    {props.isSubmitting
                      ? "Enviando..."
                      : "Enviar Correo de Recuperación"}
                    {props.isSubmitting && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </Button>
                  <Grid item align="center">
                    <Link variant="body2" component={NavLink} to="/">
                      Ir a inicio
                    </Link>
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
