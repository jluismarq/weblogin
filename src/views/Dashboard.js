import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TestContainer from "../Dashcomponents/TestContainer";
import ChartContainer from "../Dashcomponents/ChartContainer";
//import ChartSISCO from "../components/ChartSISCO";

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

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

function DashboardContent() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        sx={{
          marginTop: 11,
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 360,
              }}
            >
              <ChartContainer />
            </Paper>
          </Grid>
          {/* Test Realizados */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <TestContainer />
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
