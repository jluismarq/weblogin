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
  styled,
} from "@mui/material/styles";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { useAuth } from "../hooks/useAuth";
import { useAlert } from "../hooks/useAlert";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NavLink } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";


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

const StyledAvatar = styled(Avatar)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    background-color: #0096FF;
    transform: scale(1.3);
  }
  `}
`;

export default function UpdatePassword() {
  const auth = useAuth();
  const alert = useAlert();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (values, props) => {
    // actualizarUsuario({
    //   name: values.name,
    //   sex: values.sex,
    //   edad: values.edad,
    //   access: auth.user.access,
    // }).then(() => {
    //   auth.updateUser({
    //     name: values.name,
    //     sex: values.sex,
    //     age: values.edad,
    //   });
    //   alert.createAlert({ severity: "success", message: "Perfil Actualizado" });
    // });
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
                <StyledAvatar
                  sx={{
                    m: 1,
                    width: 100,
                    height: 100,
                    bgcolor: "#4979B8",
                    fontSize: "4rem",
                  }}
                >
                  {auth.user.name.split("")[0][0]}
                </StyledAvatar>
                <Typography component="h1" variant="h5" align="center">
                  {auth.user.user}
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" component={NavLink} to="/profile">
                    Información Personal
                  </Link>
                  <Link
                    underline="hover"
                    color="inherit"
                    component={NavLink} to="/updatepassword"
                  >
                    Contraseña
                  </Link>
                </Breadcrumbs>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Ingrese su Contraseña"
                        value={props.values.password}
                        onChange={props.handleChange}
                        error={
                          props.touched.password &&
                          Boolean(props.errors.password)
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
                              <IconButton
                                fontSize="small"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="confirmpassword"
                        label="Confirme su Contraseña"
                        type={showPassword ? "text" : "password"}
                        id="confirmpassword"
                        placeholder="Confirme su Contraseña"
                        value={props.values.confirmpassword}
                        onChange={props.handleChange}
                        error={
                          props.touched.confirmpassword &&
                          Boolean(props.errors.confirmpassword)
                        }
                        helperText={<ErrorMessage name="confirmpassword" />}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKeyOutlinedIcon fontSize="small" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                fontSize="small"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
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
                    disabled={!props.dirty || props.isSubmitting}
                  >
                    {props.isSubmitting
                      ? "Actualizando..."
                      : "Actualizar Contraseña"}
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
