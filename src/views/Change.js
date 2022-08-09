import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BarraSuperior from "../components/BarraSuperior";
import { cambiarPassword } from "../entities/users";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

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

export default function Change() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    cambiarPassword({
      email: data.get("email"),
      password: data.get("password"),
    }).then((jsonResponse) => {
      localStorage.setItem("access", jsonResponse.access);
      localStorage.setItem("refresh", jsonResponse.refresh);
    });
  };

  const initialValues = {
    email: "",
    password: "",
    confirmpassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un email válido")
      .required("El email es requirido"),
    password: Yup.string()
      .min(8, "La contraseña debe tener un mínimo de 8 caracteres de longitud")
      .required("El campo contraseña es requirido"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("La confirmación es requirida"),
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
            <PublishedWithChangesIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cambio de Contraseña
          </Typography>
          <Typography align="center">
            LLena los siguientes campos para cambiar tu contraseña
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
                        required
                        fullWidth
                        margin="normal"
                        placeholder="Ingrese su Email"
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={props.values.email}
                        onChange={props.handleChange}
                        error={
                          props.touched.email && Boolean(props.errors.email)
                        }
                        helperText={<ErrorMessage name="email" />}
                      />
                  <TextField
                        required
                        fullWidth
                        margin="normal"
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        placeholder="Ingrese su Contraseña"
                        value={props.values.password}
                        onChange={props.handleChange}
                        error={
                          props.touched.password &&
                          Boolean(props.errors.password)
                        }
                        helperText={<ErrorMessage name="password" />}
                      />
                  <TextField
                        required
                        fullWidth
                        margin="normal"
                        name="confirmpassword"
                        label="Confirme su Contraseña"
                        type="password"
                        id="confirmpassword"
                        placeholder="Confirme su Contraseña"
                        value={props.values.confirmpassword}
                        onChange={props.handleChange}
                        error={
                          props.touched.confirmpassword &&
                          Boolean(props.errors.confirmpassword)
                        }
                        helperText={<ErrorMessage name="confirmpassword" />}
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
                    Cambiar Contraseña
                  </Button>
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
