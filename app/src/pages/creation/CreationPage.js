import { useCallback, useEffect, useRef, useState } from "react";
import DarumaBall from "../../components/DarumaBall";
import "./CreationPage.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { lantern, japan_song, sakuya_song, sakuya2_song } from "../../assets";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import MusicNote from "@mui/icons-material/MusicNote";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/api";

const songs = [japan_song, sakuya_song, sakuya2_song];

function CreationPage() {
  const [description, setDescription] = useState("");
  const descriptionElement = useRef();
  const [activeLeftPupil, setActiveLeftPupil] = useState(false);
  const [activeRightPupil, setActiveRightPupil] = useState(false);
  const [title, setTitle] = useState("");
  const [typeDaruma, setTypeDaruma] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [open, setOpen] = useState(false);
  const [audio, setAudio] = useState(
    new Audio(songs[Math.floor(Math.random() * songs.length)])
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const ballWrapper = useRef();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    let toastId = null;

    if (!user) {
      toastId = toast(
        (t) => (
          <span>
            ❌ vous devez vous{" "}
            <b
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => {
                toast.dismiss(t.id);
                navigate("/login");
              }}>
              connecter
            </b>
          </span>
        ),
        { duration: 1000000 }
      );
    }

    return () => {
      toast.remove(toastId);
    };
  }, [user]);

  const onUpdatePupil = useCallback((position) => {
    if (position === "left") {
      setActiveLeftPupil(true);
      setActiveRightPupil(false);
    } else if (position === "right") {
      setActiveRightPupil(true);
      setActiveLeftPupil(false);
    }
  }, []);

  const onRemovePupil = (position) => {
    if (position === "left" && activeLeftPupil) {
      setActiveLeftPupil(false);
    } else if (position === "right" && activeRightPupil) {
      setActiveRightPupil(false);
    }
  };

  const checkValues = () => {
    if (!activeLeftPupil && !activeRightPupil) {
      toast.error("Ajoutez une pupille à votre Daruma");

      ballWrapper.current.classList.add("shake");
      setTimeout(() => {
        ballWrapper.current.classList.remove("shake");
      }, 500);
      return;
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetModal();
  };

  const handleTypeDaruma = (e) => {
    setTypeDaruma(e.target.value);
  };

  const resetModal = () => {
    setTitle("");
    setTypeDaruma("");
    setDifficulty("");
  };

  const resetFirstStep = () => {
    setDescription("");
    setActiveLeftPupil(false);
    setActiveRightPupil(false);
  };

  const handleTitle = (e) => {
    if (e.target.value.length > 10) return;
    setTitle(e.target.value);
  };

  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  const createDaruma = async () => {
    if (title && typeDaruma && difficulty) {
      const daruma = {
        title,
        description,
        difficulty,
        type_daruma: typeDaruma,
        active_left_pupil: activeLeftPupil,
        active_right_pupil: activeRightPupil,
      };

      const { data: darumaSaved, error } = await supabase
        .from("daruma")
        .insert({ ...daruma, user_id: user.id })
        .single();

      if (!error) {
        toast.success("Votre Daruma est prêt");
      }

      setOpen(false);
      resetModal();
      resetFirstStep();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      audio.play();
    }, 150);

    return () => {
      audio.pause();
      clearTimeout(timeoutId);
    };
  }, []);

  const playPause = () => {
    if (isPlaying) {
      // Pause the song if it is playing
      audio.pause();
    } else {
      // Play the song if it is paused
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={["creationpage__container", !user && "deactivate"].join(" ")}>
      <Toaster />
      <div className='creationpage__daruma__ball_wrapper' ref={ballWrapper}>
        <DarumaBall
          editable
          activeLeftPupil={activeLeftPupil}
          activeRightPupil={activeRightPupil}
          onUpdatePupil={onUpdatePupil}
          onRemovePupil={onRemovePupil}
        />
      </div>
      <div
        className='creationpage__description_box'
        onClick={() => {
          descriptionElement.current.focus();
        }}>
        <input
          ref={descriptionElement}
          type='text'
          maxLength='150'
          placeholder='Tapez ici votre voeu ou rêve à réaliser.'
          className='creationpage__description_content'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className='creationpage__actions_btn'>
        <button
          className='creationpage__validate_btn'
          disabled={!description.length > 0}
          onClick={checkValues}>
          <img src={lantern} alt='lantern' />
          <div
            className={[
              "creationpage__validate_btn_light",
              description.length > 0 && "active",
            ].join(" ")}></div>
        </button>

        <div className='creationpage__music_player'>
          {!isPlaying ? (
            <IconButton onClick={playPause} color='primary' component='label'>
              <MusicOffIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={playPause}
              variant='contained'
              color='primary'
              component='label'>
              <MusicNote />
            </IconButton>
          )}
        </div>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='xs'>
        <DialogTitle>Plus d'informations</DialogTitle>

        <DialogContent>
          <Box>
            <FormControl fullWidth sx={{ margin: "15px 0" }}>
              <TextField
                required
                label='Titre'
                value={title}
                onChange={handleTitle}
              />
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel>Type Daruma</InputLabel>
              <Select
                value={typeDaruma}
                label='typeDaruma'
                onChange={handleTypeDaruma}>
                <MenuItem value={"chance"} sx={{ background: "#ff5252" }}>
                  Chance
                </MenuItem>
                <MenuItem
                  value={"protection"}
                  sx={{ background: "#000", color: "#fff" }}>
                  Protection
                </MenuItem>
                <MenuItem value={"love"} sx={{ background: "#fff" }}>
                  Love
                </MenuItem>
                <MenuItem value={"goal"} sx={{ background: "#30980e" }}>
                  Goal
                </MenuItem>
                <MenuItem value={"abundance"} sx={{ background: "#fff039" }}>
                  Abundance
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: "15px" }}>
              <InputLabel>Difficulté</InputLabel>
              <Select
                value={difficulty}
                label='difficulty'
                onChange={handleDifficulty}>
                <MenuItem value={"facile"}>Facile</MenuItem>
                <MenuItem value={"moyen"}>Moyen</MenuItem>
                <MenuItem value={"dur"}>Dur</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            Fermer
          </Button>
          <Button onClick={createDaruma} variant='contained'>
            Créer
          </Button>
        </DialogActions>
      </Dialog>

      <div className='bird-container bird-container--one'>
        <div className='bird bird--one'></div>
      </div>

      <div className='bird-container bird-container--two'>
        <div className='bird bird--two'></div>
      </div>

      <div className='bird-container bird-container--three'>
        <div className='bird bird--three'></div>
      </div>

      <div className='bird-container bird-container--four'>
        <div className='bird bird--four'></div>
      </div>
    </div>
  );
}

export default CreationPage;
