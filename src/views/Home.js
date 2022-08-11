import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BarraSuperior from "../components/BarraSuperior";
import logo from "../assets/img/SkyDelight_logo.png";
import CardHeader from "@mui/material/CardHeader";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      SkyDelight {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const tiers = [
  {
    title: "Seguimiento",
    description: [
      "Dashboard con seguimiento de tus test realizados",
      "Acceso vía web",
      "Diseño responsivo",
    ],
  },
  {
    title: "Actividades",
    description: [
      "Disponible en la aplicación móvil",
      "Actividades para relajarse de la escuela",
      "Uso de Realidad Aumentada",
    ],
  },
  {
    title: "Test",
    description: [
      "Disponible en la aplicación móvil",
      "Ve cuán estresado estás a través de prueba psicométrica",
    ],
  },
];

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

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Grid container direction="row" alignItems="center">
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ marginTop: 10 }}
              order={{ xs: 2, sm: 1 }}
            >
              <Typography variant="h2">Bienvenido(a) a SkyDelight</Typography>
              <Typography
                variant="h5"
                sx={{ marginTop: 1, fontStyle: "italic" }}
              >
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
              order={{ xs: 1, sm: 2 }}
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

        <Grid>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            Nuestra aplicación brinda una herramienta para apoyar en la
            prevención y el seguimiento de altos niveles de estrés académico en
            estudiantes de ESCOM, entre nuestras pincipales caracteristicas
            están:
          </Typography>
        </Grid>
      </Container>

      <Container maxWidth="md" component="main" sx={{ mb: 4 }}>
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  ></Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
      
        <Container maxWidth="sm">
          <Typography variant="body1" align="center">
            'La nueva forma de relajarse'
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
