import * as React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Auth from "../hooks/Auth";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

export default function BarraSuperior() {
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
    },
  });

  const user = Auth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderStart = () => {
    return (
      <React.Fragment>
        <NavLink
          to="/login"
          style={{ marginLeft: "auto", textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            sx={{ margin: "2px", borderRadius: 5 }}
            style={{
              color: "white",
              border: "1px solid white",
              textTransform: "none",
            }}
          >
            Iniciar Sesión
          </Button>
        </NavLink>
        <NavLink to="/signup" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{ margin: "10px", borderRadius: 5 }}
            style={{
              color: "white",
              border: "1px solid white",
              textTransform: "none",
            }}
          >
            Crear Cuenta
          </Button>
        </NavLink>
      </React.Fragment>
    );
  };

  const renderUserMenu = () => {
    return (
      <>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          sx={{ marginLeft: "auto" }} 
        >
          <AccountCircle/>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Perfil</MenuItem>
          <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        <Toolbar sx={{ backgroundColor: "#39567C" }}>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <VolunteerActivismIcon sx={{ mr: 2 }} style={{ color: "white" }} />
            <Typography
              display="inline"
              variant="h6"
              color="inherit"
              style={{ color: "white" }}
            >
              SkyDelight
            </Typography>
          </NavLink>
          {!user.isAuth ? renderStart() : renderUserMenu()}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
