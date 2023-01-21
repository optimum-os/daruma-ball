import { useCallback, useState } from "react";
import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tab,
  Tabs,
  tabsClasses,
  ThemeProvider,
} from "@mui/material";
import DarumaCard from "../../components/DarumaCard/DarumaCard";
import { selectUser } from "../../store/slice/AuthSlice";
import { useSelector } from "react-redux";
import { supabase } from "../../lib/api";
import { useEffect } from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useNavigate } from "react-router-dom";
import { defaultTheme } from "../../theme";
import { undraw_adventure_map_hnin } from "../../assets";

const actions = [
  { icon: <SpeedDialIcon />, name: "Créer un daruma", type: "create_daruma" },
];

function ListDarumaPage() {
  const [value, setValue] = useState(0);
  const user = useSelector(selectUser);
  const [finishedDaruma, setFinishedDaruma] = useState([]);
  const [notFinishedDaruma, setNotFinishedDaruma] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchDaruma = useCallback(async () => {
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
  }, [user]);

  const speedDialAction = (type) => {
    if (type === "create_daruma") {
      navigate("/create");
    }
  };

  useEffect(() => {
    fetchDaruma();
  }, [fetchDaruma, finishedDaruma, notFinishedDaruma]);

  if (!user) {
    return (
      <div className='w-full p-8'>
        <div className='flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50'>
          <div className='font-bold text-4xl'>
            <ReportProblemIcon fontSize='large' /> Oops!
          </div>
          <p className='mt-4'>
            Vous devez vous connecter pour accéder à cette page
          </p>
          <button
            className='px-4 py-2 tracking-wide text-blue-600 transition-colors duration-200 transform rounded-md border-2 border-blue-600 mt-4 hover:bg-blue-600 hover:text-white'
            onClick={() => navigate("/login")}>
            Je me connecte
          </button>
        </div>
      </div>
    );
  }

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
        {value === 0 ? (
          notFinishedDaruma.length > 0 ? (
            notFinishedDaruma.map((daruma) => (
              <DarumaCard
                key={daruma.id}
                id={daruma.id}
                userId={daruma.user_id}
                typeDaruma={daruma.type_daruma}
                title={daruma.title}
                difficulty={daruma.difficulty}
                isFinished={daruma.is_finished}
                description={daruma.description}
                activeLeftPupil={daruma.active_left_pupil}
                activeRightPupil={daruma.active_right_pupil}
                setNotFinishedDaruma={setNotFinishedDaruma}
                setFinishedDaruma={setFinishedDaruma}
              />
            ))
          ) : (
            <div>
              <img
                src={undraw_adventure_map_hnin}
                alt='adventure'
                width='300'
                height='300'
              />
              <p className='mt-8 font-bold '>
                Vous n'avez aucun Daruma en cours ...
              </p>
            </div>
          )
        ) : (
          finishedDaruma.map((daruma) => (
            <DarumaCard
              key={daruma.id}
              id={daruma.id}
              userId={daruma.user_id}
              typeDaruma={daruma.type_daruma}
              title={daruma.title}
              difficulty={daruma.difficulty}
              description={daruma.description}
              isFinished={daruma.is_finished}
              activeLeftPupil={daruma.active_left_pupil}
              activeRightPupil={daruma.active_right_pupil}
              setNotFinishedDaruma={setNotFinishedDaruma}
              setFinishedDaruma={setFinishedDaruma}
            />
          ))
        )}
      </Box>
      <ThemeProvider theme={defaultTheme}>
        <SpeedDial
          ariaLabel='SpeedDial basic example'
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}>
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => speedDialAction(action.type)}
            />
          ))}
        </SpeedDial>
      </ThemeProvider>
    </Box>
  );
}

export default ListDarumaPage;
