import { useState } from "react";
import { Box, Tab, Tabs, tabsClasses } from "@mui/material";
import DarumaCard from "../../components/DarumaCard/DarumaCard";
import { selectUser } from "../../store/slice/AuthSlice";
import { useSelector } from "react-redux";
import { supabase } from "../../lib/api";
import { useEffect } from "react";

function ListDarumaPage() {
  const [value, setValue] = useState(0);
  const user = useSelector(selectUser);
  const [finishedDaruma, setFinishedDaruma] = useState([]);
  const [notFinishedDaruma, setNotFinishedDaruma] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchDaruma = async () => {
    if (user) {
      const { data: finishedDaruma } = await supabase
        .from("daruma")
        .select()
        .eq("user_id", user.id)
        .eq("is_finished", true);
      const { data: notFinishedDaruma } = await supabase
        .from("daruma")
        .select()
        .eq("user_id", user.id)
        .eq("is_finished", false);

      setFinishedDaruma(finishedDaruma);
      setNotFinishedDaruma(notFinishedDaruma);
    }
  };

  useEffect(() => {
    fetchDaruma();
  }, [user]);

  return (
    <Box sx={{ margin: "10px 10px", width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          overflowX: "hidden",
        }}>
        <Tabs
          sx={{
            flexGrow: 1,
            maxWidth: { xs: 320, sm: 480 },
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
          value={value}
          onChange={handleChange}
          scrollButtons
          aria-label='tabs indicating the balls evolution'
          variant='scrollable'>
          <Tab label='Work in progress' />
          <Tab label='Completed' />
        </Tabs>
      </Box>
      <Box
        sx={{
          margin: "100px 0px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: "50px",
          rowGap: "90px",
        }}>
        {value === 0
          ? notFinishedDaruma.map((daruma) => (
              <DarumaCard
                key={daruma.id}
                typeDaruma={daruma.type_daruma}
                title={daruma.title}
                difficulty={daruma.difficulty}
                description={daruma.description}
                activeLeftPupil={daruma.active_left_pupil}
                activeRightPupil={daruma.active_right_pupil}
              />
            ))
          : finishedDaruma.map((daruma) => (
              <DarumaCard
                key={daruma.id}
                typeDaruma={daruma.type_daruma}
                title={daruma.title}
                difficulty={daruma}
                description={daruma.description}
                activeLeftPupil={daruma.active_left_pupil}
                activeRightPupil={daruma.active_right_pupil}
              />
            ))}
      </Box>
    </Box>
  );
}

export default ListDarumaPage;
