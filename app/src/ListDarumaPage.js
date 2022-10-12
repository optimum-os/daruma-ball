import { useState } from "react";
import { Box, Tab, Tabs, tabsClasses } from "@mui/material";
import DarumaCard from "./components/DarumaCard/DarumaCard";

function ListDarumaPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ margin: '10px 10px', width: '100%', overflow: 'hidden'}}>
      <Box sx={{
        width: '100%', display: 'flex', justifyContent: 'center', overflowX: 'hidden'
        }}>
        <Tabs
          sx={{
            flexGrow: 1,
            maxWidth: { xs: 320, sm: 480 },
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          }}
          value={value}
          onChange={handleChange}
          scrollButtons
          aria-label="tabs indicating the balls evolution"
          variant="scrollable"
        >
          <Tab label="Work in progress" />
          <Tab label="Completed" />
        </Tabs>
      </Box>
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