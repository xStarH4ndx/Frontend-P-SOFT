import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

type ThemeProp = {
    children: JSX.Element
}

export enum themePalette {
    BG = "#071013",
    BLUE = "#1d4ed8",
    FONT_GLOBAL = "'Poppins', sans-serif",
}

const theme = createTheme({
    palette:{
        mode:"dark",
        background:{
            default: themePalette.BG,
        },
        primary:{
            main: themePalette.BLUE,
        },
    },
    typography:{
        fontFamily: themePalette.FONT_GLOBAL
    },
    components:{
        MuiButton:{
            defaultProps:{
                style:{
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: "9px",
                    transition: "all 0.3s ease",
                    color: "#ffff",
                    cursor: "pointer",
                }
            }
        }
    }
});

export const ThemeConfig: React.FC<ThemeProp> = ({children}) =>{
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
};