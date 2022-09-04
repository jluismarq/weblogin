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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import { useAuth } from "../hooks/useAuth";
import { actualizarUsuario, eliminarUsuario } from "../entities/users";
import { useAlert } from "../hooks/useAlert";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DeleteIcon from "@mui/icons-material/Delete";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";

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

export default function Profile() {
  const auth = useAuth();
  const alert = useAlert();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (values, props) => {
    //console.log(values);
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

  const handleDelete = () => {
    console.log("eliminar cuenta");
    handleClose();
    eliminarUsuario({
      email: auth.user.user,
      access: auth.user.access,
    }).then(() => {
      auth.signout();
      navigate("/", { replace: true });
      alert.createAlert({ severity: "warning", message: "Cuenta eliminada" });
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
                <Breadcrumbs aria-label="breadcrumb">
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
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="firstName"
                        label="Nombre"
                        value={props.values.name}
                        onChange={props.handleChange}
                        error={props.touched.name && Boolean(props.errors.name)}
                        helperText={<ErrorMessage name="name" />}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineOutlinedIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
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
                        fullWidth
                        name="edad"
                        label="Edad"
                        id="edad"
                        type="number"
                        value={props.values.edad}
                        onChange={props.handleChange}
                        error={props.touched.edad && Boolean(props.errors.edad)}
                        helperText={<ErrorMessage name="edad" />}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CakeOutlinedIcon fontSize="small" />
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
                      : "Actualizar Perfil"}
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
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    sx={{
                      textTransform: "none",
                      borderRadius: 5,
                    }}
                    onClick={handleClickOpen}
                    startIcon={<DeleteIcon />}
                  >
                    Eliminar Cuenta
                  </Button>
                  <div>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      PaperProps={{
                        style: {
                          boxShadow: "none",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 12,
                        },
                      }}
                    >
                      <DialogTitle id="alert-dialog-title">
                        <Grid container alignItems="center">
                          <WarningAmberIcon sx={{ color: "#ffa726" }} />
                          {"Eliminar Cuenta"}
                        </Grid>
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText
                          id="alert-dialog-description"
                          sx={{ textAlign: "center" }}
                        >
                          Al eliminar tu cuenta todos tus registros
                          desaparecerán,&nbsp;
                          <strong>¡No podrás, revertir este cambio!</strong>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleDelete}
                          sx={{
                            textTransform: "none",
                            borderRadius: 5,
                          }}
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                        >
                          ¡Sí, bórrala!
                        </Button>
                        <Button
                          onClick={handleClose}
                          sx={{
                            textTransform: "none",
                            borderRadius: 5,
                          }}
                          variant="outlined"
                          autoFocus
                          color="error"
                        >
                          Cancelar
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
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
