import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardContent, CardMedia, Card, Stack, Stepper, Step, Button, StepLabel, StepContent, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon, Chip, ThemeProvider } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FaceIcon from '@mui/icons-material/Face';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import homeCardImg from './assets/home-card.png';
import { defaultTheme } from './theme';

const steps = [
  {
    label: 'Trouvez un objectif',
    description: `Essayer de trouver un objectif ou un voeu à réaliser.`,
  },
  {
    label: 'Inscrivez-le sur un Daruma ball',
    description:
      'Ecrivez votre objectif dans le coeur au dos du Daruma.',
  },
  {
    label: 'Coloriez une des pupilles de Daruma',
    description: `Les Daruma n'a pas de pupille. Vous devez alors dessiner le premier oeil en pensant à votre objectif.`,
  },
  {
    label: 'Faites en sorte de le respecter',
    description: `Daruma vous aidera à rappeller en permanence l'objectif souhaité.`,
  },
  {
    label: 'Dessiner sa deuxième pupille pour terminer',
    description: `Quand l'objectif est atteint, vous pouvez dessiner sa deuième pupille.`,
  },
];

const actions = [
  { icon: <SpeedDialIcon />, name: 'Créer un daruma' },
  { icon: <ShareIcon />, name: 'Share' },
];

function HomePage() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
      <Card sx={{p: 2, marginBottom: 2, backgroundColor: '#ff5252', color: '#fff' }}>
        {/*
          xs (extra-small): 0px or larger
          sm (small): 600px or larger
          md (medium): 960px or larger
          lg (large): 1280px or larger
          xl (extra-large): 1920px or larger
        */}
        <Box 
          sx={{ display: 'flex', alignItems: 'center' }}
          flexDirection={{ md: 'row', xs: 'column-reverse' }}
          justifyContent={{ md: 'space-between', xs: 'center'}}
          >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5" sx={{marginBottom: 1}}>
                Faites de vos objectifs une réalité
              </Typography>
              <Typography variant="subtitle1" sx={{color: '#ebebeb'}} component="div">
                Avec daruma, plus besoin de procrastiner
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 280 }}
            image={homeCardImg}
            alt="Image by pch.vector on Freepik"
            />
        </Box>
      </Card>

      <Box sx={{margin: '25px 0'}}>
        <Stack direction='row' flexWrap='wrap' sx={{gap: 2}}>
          <Chip icon={<AccessAlarmIcon />} label="Anti-procrastinator" variant="outlined" />
          <Chip icon={<DirectionsRunIcon />} label="Booster" variant="outlined" />
          <Chip icon={<FaceIcon />} label="Outil de développement personnel" variant="outlined" />
        </Stack>
      </Box>

      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ maxWidth: 400 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 4 ? (
                      <Typography variant="caption">Dernière Etape</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Terminer' : 'Continuer'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Retour
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>Toutes les étapes sont terminées - vous avez terminé</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Réinitialiser
              </Button>
            </Paper>
          )}
        </Box>

        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </ThemeProvider>
    </Box>
  );
}

export default HomePage;
