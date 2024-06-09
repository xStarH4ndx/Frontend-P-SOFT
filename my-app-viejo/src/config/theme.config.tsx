import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

type ThemeProp = {
    children: JSX.Element
}

export enum themePalette {
    BG = "#071013",
    BLUE = "#1d4ed8",
    FONT_GLOBAL = "'Poppins', sans-serif",
    //Alert Styles
    ERROR_MAIN = "#f44336",
    BG_ERROR_MAIN = "rgba(244,67,54,0.1)",
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
        },
        MuiAlert:{
            defaultProps:{
                style:{
                    borderRadius: "0.8em",
                    fontSize: "1em",
                },
            },
            styleOverrides:{
                standardError:{
                    border:`1px solid ${themePalette.ERROR_MAIN}`,
                    background: themePalette.BG_ERROR_MAIN,
                },
            },
        },
    },
});

export const ThemeConfig: React.FC<ThemeProp> = ({children}) =>{
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};