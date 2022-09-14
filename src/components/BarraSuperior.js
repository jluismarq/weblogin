import * as React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { createTheme, ThemeProvider,  responsiveFontSizes } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useLocation } from 'react-router-dom';
//import { useAlert } from "../hooks/useAlert";

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

const titles ={
  "/": "Dashboard",
  "/profile": "Perfil",
  "/updatepassword":"Contraseña",
};

export default function BarraSuperior() {
  const user = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = React.useState(titles["/"]);
 
  React.useEffect(() =>{
    setTitle(titles[location.pathname]);
  },[location.pathname]);

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
    //alert.createAlert({ severity: "info", message: "Has Cerrado Sesión" });
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

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
            sx={{ margin: "2px", borderRadius: 5,  display: { xs: 'none', sm: 'block' }  }}
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
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <AccountCircle />
          </StyledBadge>
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
          <MenuItem onClick={handleClose} component={NavLink} to="/">
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>{" "}
            Dashboard
          </MenuItem>
          <MenuItem onClick={handleClose} component={NavLink} to="/profile">
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
                {!user.user ? "SkyDelight": "SkyDelight " + title} 
              </Typography>
            </NavLink>
            {!user.user ? renderStart() : renderUserMenu()}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
