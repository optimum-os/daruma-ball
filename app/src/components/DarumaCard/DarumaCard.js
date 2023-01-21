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
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slice/AuthSlice";
import { supabase } from "../../lib/api";

const ColorDaruma = {
  chance: "red",
  protection: "black",
  love: "white",
  goal: "green",
  abundance: "gold",
};

function DarumaCard({
  id,
  userId,
  title,
  description,
  difficulty,
  isFinished,
  typeDaruma = "chance",
  activeLeftPupil = true,
  activeRightPupil = true,
  setNotFinishedDaruma,
  setFinishedDaruma,
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
            <IconMenu
              id={id}
              userId={userId}
              isFinished={isFinished}
              setNotFinishedDaruma={setNotFinishedDaruma}
              setFinishedDaruma={setFinishedDaruma}
            />
          </Menu>
        </div>
      </div>
    </div>
  );
}

function IconMenu({
  id,
  userId,
  isFinished,
  setNotFinishedDaruma,
  setFinishedDaruma,
}) {
  const user = useSelector(selectUser);

  const finishDaruma = async () => {
    if (user && userId === user.id) {
      const { data, error } = await supabase
        .from("daruma")
        .update({ is_finished: true })
        .eq("id", id);

      if (!error) {
        setFinishedDaruma((prev) => prev.filter((daruma) => daruma.id !== id));
      }
    }
  };

  const deleteDaruma = async () => {
    if (user && userId === user.id) {
      const { data, error } = await supabase
        .from("daruma")
        .delete()
        .eq("id", id);
    }
  };

  return (
    <Paper>
      <MenuList>
        {!isFinished && (
          <MenuItem onClick={finishDaruma}>
            <ListItemIcon>
              <EditIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Terminer</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={deleteDaruma}>
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
