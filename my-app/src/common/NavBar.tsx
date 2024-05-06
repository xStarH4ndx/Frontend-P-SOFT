import React, { useState } from "react";
import { AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from '@mui/icons-material';
import Logo from '../assets/images/logo-empresa.png';
import { useNavigate } from "react-router-dom";

export const NavBar: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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
                                <Typography variant="h6" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "300", marginLeft: "10px" }}>
                                    People<span style={{ fontWeight: "bold" }}>Now</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                {/* Botón de la hamburguesa */}
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={toggleMenu}
                                    sx={{ display: { xs: 'block', lg: 'none' } }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                {/* Contenido del menú */}
                                <Box sx={{ display: { xs: menuOpen ? 'block' : 'none', lg: 'flex' }, alignItems: 'center' }}>
                                    <nav style={{ marginRight: "20px" }}>
                                        <ul style={{ display: "flex", listStyle: "none", padding: 0, fontFamily: 'Poppins, sans-serif', fontSize: "1rem" }}>
                                            <li style={{ marginRight: "20px" }}><a style={{ color: "#fff", textDecoration: "none" }} href="/">Inicio</a></li>
                                            <li style={{ marginRight: "20px" }}><a style={{ color: "#fff", textDecoration: "none" }} href="/">Servicios</a></li>
                                            <li><a style={{ color: "#fff", textDecoration: "none" }} href="/">Ayuda</a></li>
                                        </ul>
                                    </nav>
                                    <Button variant="contained" onClick={() => navigate("login")}>Login</Button>
                                    <Button variant="outlined" style={{ marginLeft: "10px" }}>Sign in</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
