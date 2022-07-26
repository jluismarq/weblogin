import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BarraSuperior from "../components/BarraSuperior";
import logo from "../assets/img/SkyDelight_logo.png";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      Your Website {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Home() {
  return (
    <Container>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Grid container direction="row" alignItems="center">
          <BarraSuperior />
          <Grid item xs={12} sm={6} sx={{ marginTop: 10 }} order={{xs:2,sm:1}}>
            <Typography variant="h2">Bienvenido(a) a SkyDelight</Typography>
            <Typography variant="h5" sx={{ marginTop: 1, fontStyle: "italic" }}>
              'La nueva forma de relajarse'
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            justifyContent="center"
            sx={{ marginTop: 10 }}
            order={{xs:1,sm:2}}
          >
            <img
              className="logo"
              src={logo}
              alt="SkyDelight"
              style={{ width: "100%", height: "auto", maxWidth: "700px" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
