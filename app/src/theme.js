import { createTheme } from '@mui/material/styles';

const globalTheme = createTheme({
    palette: {
        primary: {
            main: '#ff5252',
            light: '#ff7474',
            dark: '#b23939',
            contrastText: '#fff',
        },
        secondary: {
            main: '#ffff82',
            light: '#ffff9b',
            dark: '#b2b25b',
            contrastText: '#000',
        },
        info: {
            main: '#6e44ff'
        }
    },
    //custom theme variables
    text: {
        main: '#000',
        light: '#fff'
    }
});

export const defaultTheme = createTheme({});

export default globalTheme;