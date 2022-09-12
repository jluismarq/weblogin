import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ChartSISCO from "../components/ChartSISCO";
import ChartSVQ from "../components/ChartSVQ";
import ChartPSS from "../components/ChartPSS";
import ChartSVS from "../components/ChartSVS";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TestContainer = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

     
    <Box sx={{ width: "100%", height: 350 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="pruebas psicométricas"
          scrollButtons="auto"
          allowScrollButtonsMobile
          variant="scrollable"
          centered
        >
          <Tab label="sisco" {...a11yProps(0)} />
          <Tab label="svq" {...a11yProps(1)} />
          <Tab label="pss" {...a11yProps(2)} />
          <Tab label="svs" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ChartSISCO />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChartSVQ />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ChartPSS />
      </TabPanel>
      <TabPanel value={value} index={3}>
       <ChartSVS/>
      </TabPanel>
    </Box>
  );
};

export default TestContainer;
