import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";



export const purpleTheme = createTheme({
    palette:{
        primary:{
            main: '#C689C6',
        },
        secondary:{
            main: '#E8A0BF'
        },
        error:{
            main: '#610C63'
        },
        err:{
            main: 'red'
        }
    }
})
