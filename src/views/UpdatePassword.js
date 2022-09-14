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
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import { cambiarPassword } from "../entities/users";

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
    cambiarPassword({
      email: auth.user.user,
      password: values.confirmpassword,
      access: auth.user.access,
    }).then(() => {
      auth.updateUser({
        name: values.name,
        sex: values.sex,
        age: values.edad,
      });
      props.resetForm();
      props.setSubmitting(false);
      alert.createAlert({
        severity: "success",
        message: "Contraseña Actualizada",
      });
    });
  };

  const initialValues = {
    password: "",
    confirmpassword: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(/^\S*$/, "Los espacios en blanco no son permitidos")
      .min(8, "La contraseña debe tener un mínimo de 8 caracteres de longitud")
      .max(50, "Solo soportamos hasta 50 caracteres")
      .required("El campo contraseña es requirido"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .max(50, "Solo soportamos hasta 50 caracteres")
      .required("La confirmación es requirida"),
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
                <Chip
                  icon={<FaceIcon fontSize="small" />}
                  label={auth.user.user}
                />
                <Breadcrumbs aria-label="breadcrumb" separator="‹">
                  <Link
                    underline="hover"
                    color="inherit"
                    component={NavLink}
                    to="/profile"
                    variant="body2"
                  >
                    Información Personal
                  </Link>
                  <Link
                    underline="hover"
                    color="inherit"
                    component={NavLink}
                    to="/updatepassword"
                    variant="body2"
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
                        label="Nueva Contraseña"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Ingrese nueva contraseña"
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
                        label="Confirme su nueva contraseña"
                        type={showPassword ? "text" : "password"}
                        id="confirmpassword"
                        placeholder="Confirme su nueva contraseña"
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
