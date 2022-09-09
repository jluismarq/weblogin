import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SISCO from "../components/SISCO";

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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          scrollButtons="auto"
          allowScrollButtonsMobile
          variant="scrollable"
          centered
        >
          <Tab label="sisco" {...a11yProps(0)} />
          <Tab label="svq" {...a11yProps(1)} />
          <Tab label="cses" {...a11yProps(2)} />
          <Tab label="pss" {...a11yProps(3)} />
          <Tab label="svs" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SISCO />
      </TabPanel>
      <TabPanel value={value} index={1}>
        svq
      </TabPanel>
      <TabPanel value={value} index={2}>
        cses
      </TabPanel>
      <TabPanel value={value} index={3}>
        pss
      </TabPanel>
      <TabPanel value={value} index={4}>
        svs
      </TabPanel>
    </Box>
  );
};

export default TestContainer;
