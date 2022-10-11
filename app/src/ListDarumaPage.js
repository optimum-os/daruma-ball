import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import DarumaCard from "./components/DarumaCard/DarumaCard";

function ListDarumaPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ margin: '10px 10px', width: '100%'}}>
      <Tabs
        value={value}
        onChange={handleChange}
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        centered
      >
        <Tab label="Work in progress" />
        <Tab label="Completed" />
      </Tabs>
      <Box sx={{ margin: '100px 0px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: '50px', rowGap: '90px'}}>
        <DarumaCard />
        <DarumaCard />
        <DarumaCard />
        <DarumaCard />
      </Box>
    </Box>
  )
}

export default ListDarumaPage;