import * as React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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

  const user = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    user.signout();
    navigate("/", { replace: true });
  }; 

  const renderStart = () => {
    return (
      <React.Fragment>
        <NavLink
          to="/login"
          style={{ marginLeft: "auto", textDecoration: "none" }}
        >
          <Button
            size="small"
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
            size="small"
            sx={{ margin: "2px", borderRadius: 5 }}
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
          <AccountCircle />
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
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>{" "}
            Perfil
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Cerrar Sesión
          </MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar sx={{ backgroundColor: "#39567C" }}>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <VolunteerActivismIcon
                sx={{ mr: 2 }}
                style={{ color: "white" }}
                fontSize="small"
              />
              <Typography
                display="inline"
                variant="h6"
                color="inherit"
                style={{ color: "white" }}
              >
                {!user.isAuth ? "SkyDelight" : "SkyDelight Dashboard"} 
              </Typography>
            </NavLink>
            {!user.user ? renderStart() : renderUserMenu()}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
