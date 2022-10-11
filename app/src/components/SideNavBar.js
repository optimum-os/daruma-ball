import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Stack} from '@mui/material';
import { grey } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import daruma from '../assets/daruma.svg';

const drawerWidth = 240;

function SideNavBar() {
  const navigate = useNavigate();

  return (
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ bgcolor: grey[50] }}>
          <Stack direction="row" spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
            <Avatar src={daruma} />
            <Typography>Daruma Ball</Typography>
          </Stack>
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/')}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Accueil' />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/list')}>
                <ListItemIcon>
                  <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary='Liste' />
              </ListItemButton>
          </ListItem>
        </List>
    </Drawer>
  )
}

export default SideNavBar