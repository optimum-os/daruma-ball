import { Box } from "@mui/material";
import DarumaBall from "./components/DarumaBall"

function ListDarumaPage() {
  return (
    <Box sx={{ margin: '10px', width: '100%', minHeight: '100vh'}}>
      <DarumaBall activeLeftPupil={true} activeRightPupil={true} />
    </Box>
  )
}

export default ListDarumaPage;