import React, { useEffect, useState } from "react";
import { AppBar, Box, Button, Container, Grid, Stack, Toolbar } from "@mui/material";
import Logo from '../assets/images/logo-empresa.png';
import { useNavigate } from "react-router";

export const NavBar: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    useEffect(() => {  
        const userRegistered = localStorage.getItem('userRegistered');
        setIsRegistered(userRegistered === 'true');
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userRegistered');
        setIsRegistered(false);
        navigate("/login");
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
                            spacing={2}
                        >
                            <Grid item container alignItems="center" xs={5}>
                                <img src={Logo} alt="Logo de la empresa" style={{ maxWidth: "60px", width: "100%", display: "flex" }} />
                                <h2 style={{ color: "#fff", fontSize: "2rem", fontWeight: "300", marginLeft: "10px" }}>
                                    People<span style={{ fontWeight: "bold" }}>Now</span>
                                </h2>
                            </Grid>
                            <Grid item container alignItems="center" xs={2}>
                                <Stack direction="row" spacing={2}>
                                    {isRegistered ? (
                                        <>
                                            <Button variant="contained" onClick={() => navigate("/perfil")}>Perfil</Button>
                                            
                                            <Button variant="outlined" onClick={handleLogout}>Logout</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="contained" onClick={() => navigate("/login")}>Login</Button>
                                            <Button variant="outlined" onClick={() => navigate("/registro")}>Sign in</Button>
                                            <Button variant="contained" onClick={() => navigate("/mis-servicios")}>Mis Servicios</Button>
                                        </>
                                    )}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
