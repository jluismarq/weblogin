import * as React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import '../font.css'

export default function BarraSuperior() {
  return (
    <AppBar>
      <Toolbar sx={{backgroundColor:'#39567C'}}>
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
        <NavLink
          to="/login"
          style={{ marginLeft: "auto", textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            sx={{ margin: "2px" }}
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
            sx={{ margin: "10px" }}
            style={{
              color: "white",
              border: "1px solid white",
              textTransform: "none",
            }}
          >
            Regístrarse
          </Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}
