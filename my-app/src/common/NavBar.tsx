import React from "react";
import { AppBar, Box, Button, Container, Grid, Stack, Toolbar } from "@mui/material";
import Logo from '../assets/images/logo-empresa.png';
import { useNavigate } from "react-router-dom";

export const NavBar: React.FC<{}> = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>
                    <Container maxWidth="xl">
                        <Grid container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2} // Espaciado entre los elementos del Grid
                        >
                            <Grid item container alignItems="center" xs={6}> {/* Ancho del 50% */}
                                <img src={Logo} alt="Logo de la empresa" style={{ maxWidth: "60px", width: "100%", display: "flex" }} />
                                <h2 style={{ color: "#fff", fontSize: "2rem", fontWeight: "300", marginLeft: "10px" }}>
                                    People<span style={{ fontWeight: "bold" }}>Now</span>
                                </h2>
                            </Grid>
                            <Grid item container alignItems="center" xs={6}> {/* Ancho del 50% */}
                                {/* Navegador */}
                                <nav style={{ marginRight: "auto" }}>
                                    <ul style={{ display: "flex", listStyle: "none", padding: 0, fontFamily: 'Poppins, sans-serif', fontSize: "1rem", color: "#fff" }}>
                                        <li style={{ marginRight: "20px" }}><a href="/">Inicio</a></li>
                                        <li style={{ marginRight: "20px" }}><a href="/">Servicios</a></li>
                                        <li><a href="/">Ayuda</a></li>
                                    </ul>
                                </nav>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" onClick={()=> navigate("login")}>Login</Button>
                                    <Button variant="outlined">Sing in</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
