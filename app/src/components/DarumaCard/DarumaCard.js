import { useState } from "react";
import { IconButton, Menu } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DarumaBall from "../DarumaBall";
import "./DarumaCard.css";

const ColorDaruma = {
  chance: "red",
  protection: "black",
  love: "white",
  goal: "green",
  abundance: "gold",
};

function DarumaCard({
  title,
  description,
  difficulty,
  typeDaruma = "chance",
  activeLeftPupil = true,
  activeRightPupil = true,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='daruma__card'>
      <div className='daruma__ball_container'>
        <div className='daruma__ball_wrapper'>
          <DarumaBall
            activeLeftPupil={activeLeftPupil}
            activeRightPupil={activeRightPupil}
            color={ColorDaruma[typeDaruma]}
          />
        </div>
      </div>

      <div className='daruma__card_description'>
        <h2 className='daruma__card_description_title'>
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h2>
        <p className='daruma__card_description_text'>{description}</p>
      </div>

      <div className='daruma__card_tags_and_actions'>
        <div className='daruma__card_tags'>
          <span className='daruma__card_tag'>{difficulty}</span>
          <span className='daruma__card_tag'>{typeDaruma}</span>
        </div>
        <div className='daruma__card_actions'>
          <IconButton
            id='more_actions_button'
            aria-controls={open ? "more_actions-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color='error'
            aria-label='more'
            sx={{ border: "2px solid" }}>
            <MoreHorizIcon />
          </IconButton>

          <Menu
            id='more_actions-menu'
            aria-labelledby='more_actions_button'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}>
            <IconMenu />
          </Menu>
        </div>
      </div>
    </div>
  );
}

function IconMenu() {
  return (
    <Paper>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <EditIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Modifier</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Supprimer</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default DarumaCard;
