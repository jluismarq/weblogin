import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import { useAuth } from "../hooks/useAuth";
import { actualizarUsuario } from "../entities/users";
import { useAlert } from "../hooks/useAlert";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">SkyDelight</Link> {new Date().getFullYear()}
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

export default function Profile() {
  
  const auth = useAuth();
  const alert = useAlert();
  //console.log(auth);
  //var User = localStorage.getItem("user");
  //var currentUser = JSON.parse(User);

  //const [name, setName] = React.useState(currentUser.name);
  //const [edad, setEdad] = React.useState(currentUser.edad);
  //const [sex, setSex] = React.useState(currentUser.sex);

  //  const handleChange = (event) => {
  //    setSex(event.target.value);
  //  };

  const handleSubmit = (values, props) => {
    console.log(values);
    actualizarUsuario({
      name: values.name,
      sex: values.sex,
      edad: values.edad,
      access: auth.user.access,
    }).then(() => {
      auth.updateUser({
        name: values.name,
        sex: values.sex,
        age: values.edad,
      });
      alert.createAlert({ severity: "success", message: "Perfil Actualizado" });
    });
  };

  const initialValues = {
    name: auth.user.name,
    sex: auth.user.sex,
    edad: auth.user.age,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Tu nombre es muy corto")
      .max(50, "Solo soportamos hasta 50 caracteres")
      .matches(
        /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
        "Solo las letras son válidas en este campo"
      )
      .required("El nombre es requerido"),
    edad: Yup.number()
      .integer("Debe ser un número entero")
      .min(18, "La edad minima es de 17 años")
      .max(25, "Sobrepasaste los límites de la juventud")
      .required("La edad es requirida"),
    sex: Yup.string()
      .oneOf(["Masculino", "Femenino"])
      .required("Por favor, elige un sexo"),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}

        >
          {(props) => (
            <Form>
              <Box
                sx={{
                  marginTop: 11,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    m: 1,
                    width: 100,
                    height: 100,
                    bgcolor: "#4979B8",
                    fontSize: "50px",
                  }}
                >
                 {auth.user.name.split(" ")[0][0]} 
                </Avatar>
                <Typography component="h1" variant="h5" align="center">
                 {auth.user.user}
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="firstName"
                        label="Nombre"
                        value={props.values.name}
                        onChange={props.handleChange}
                        //defaultValue={currentUser.name}
                        error={props.touched.name && Boolean(props.errors.name)}
                        helperText={<ErrorMessage name="name" />}
                      />
                    </Grid>
                    <Grid item xs={12}>
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

                    <Grid item xs={12}>
                      <TextField
                        required
                        //inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        fullWidth
                        name="edad"
                        label="Edad"
                        id="edad"
                        //type="number"
                        value={props.values.edad}
                        onChange={props.handleChange}
                        //defaultValue={currentUser.age}
                        error={props.touched.edad && Boolean(props.errors.edad)}
                        helperText={<ErrorMessage name="edad" />}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 2,
                      textTransform: "none",
                      background: "#4979B8",
                      borderRadius: 5,
                    }}
                  >
                    {props.isSubmitting ? "Actualizando..." : "Actualizar Perfil"}
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
