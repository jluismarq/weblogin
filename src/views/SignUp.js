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
import FormHelperText from "@mui/material/FormHelperText";
import { NavLink } from "react-router-dom";
import { crearUsuario } from "../entities/users";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2';

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
  const handleSubmit = (values, props) => {
    //console.log(values);
    crearUsuario({
      name: values.name,
      email: values.email,
      edad: parseInt(values.edad),
      sex: values.sex,
      password: values.confirmpassword,
    }).then((jsonResponse) => {
      localStorage.setItem("access", jsonResponse.access);
      localStorage.setItem("refresh", jsonResponse.refresh);
    });

    Swal.fire({
      title:"Registro Exitoso",
      text:"Te has unido a SkyDelight",
      icon:"success",
      button:"Aceptar",
      confirmButtonColor: '#4979B8'
    });

  };

  const initialValues = {
    name: "",
    email: "",
    edad: "",
    sex: "",
    password: "",
    confirmpassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Tu nombre es muy corto")
      .matches(/^[aA-zZ\s]+$/, "Solo las letras son válidas en este campo")
      .required("El nombre es requerido"),
    email: Yup.string()
      .email("Ingrese un email válido")
      .required("El email es requirido"),
    edad: Yup.number()
      .integer()
      .min(18, "La edad minima es de 17 años")
      .max(25, "Sobrepasaste los límites de la juventud")
      .required("La edad es requirida"),
    sex: Yup.string()
      .oneOf(["Masculino", "Femenino"])
      .required("Por favor, elige un sexo"),
    password: Yup.string()
      .min(8, "La contraseña debe tener un mínimo de 8 caracteres de longitud")
      .required("El campo contraseña es requirido"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("La confirmación es requirida"),
  });

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
            Creemos tu cuenta
          </Typography>
          <Typography>LLena los siguientes campos para registrarte</Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        placeholder="Ingrese su Nombre Completo"
                        id="name"
                        label="Nombre"
                        name="name"
                        value={props.values.name}
                        onChange={props.handleChange}
                        error={props.touched.name && Boolean(props.errors.name)}
                        helperText={<ErrorMessage name="name" />}
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
                        value={props.values.email}
                        onChange={props.handleChange}
                        error={
                          props.touched.email && Boolean(props.errors.email)
                        }
                        helperText={<ErrorMessage name="email" />}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        required
                        fullWidth
                        placeholder="Ingrese su Edad"
                        id="edad"
                        label="Edad"
                        name="edad"
                        type="number"
                        value={props.values.edad}
                        onChange={props.handleChange}
                        error={props.touched.edad && Boolean(props.errors.edad)}
                        helperText={<ErrorMessage name="edad" />}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl
                        fullWidth
                        error={props.touched.sex && Boolean(props.errors.sex)}
                      >
                        <InputLabel id="sex">Sexo</InputLabel>
                        <Select
                          labelId="sex"
                          name="sex"
                          id="sex"
                          value={props.values.sex}
                          label="Sexo"
                          onChange={props.handleChange}
                        >
                          <MenuItem value={"Masculino"}>Masculino</MenuItem>
                          <MenuItem value={"Femenino"}>Femenino</MenuItem>
                        </Select>
                        {props.touched.sex && Boolean(props.errors.sex) && (
                          <FormHelperText error>
                            Por favor, Elige un Sexo
                          </FormHelperText>
                        )}
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
                        value={props.values.password}
                        onChange={props.handleChange}
                        error={
                          props.touched.password &&
                          Boolean(props.errors.password)
                        }
                        helperText={<ErrorMessage name="password" />}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
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
                        Crear Cuenta
                      </Button>
                    </Grid>

                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <NavLink
                          to="/login"
                          href="#"
                          style={{
                            fontWeight: "normal",
                            fontSize: "0.875em",
                            color: "#0645AD",
                          }}
                        >
                          ¿Ya tienes una cuenta? Inicia Sesión
                        </NavLink>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
