import React, { useEffect, useState } from "react";
import { AppBar, Box, Button, Container, Grid, Stack, Toolbar } from "@mui/material";
import Logo from '../assets/images/logo-empresa.png';
import { useNavigate } from "react-router";

export const NavBar: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {  
        const checkLoggedInStatus = () => {
            const userLoggedIn = localStorage.getItem('isLoggedIn');
            setIsLoggedIn(userLoggedIn === 'true');
        };

        checkLoggedInStatus();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>
                    <Container maxWidth="xl">
                        <Grid
                            container
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
                                    {isLoggedIn ? (
                                        <>
                                            <Button variant="contained" onClick={() => navigate("/perfil")}>Perfil</Button>
                                            <Button variant="outlined" onClick={handleLogout}>Logout</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="contained" onClick={() => navigate("/login")}>Login</Button>
                                            <Button variant="outlined" onClick={() => navigate("/registro")}>Sign in</Button>
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
