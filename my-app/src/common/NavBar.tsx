import React, { useEffect, useState } from "react";
import { AppBar, Box, Button, Container, Grid, Stack, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/logo-empresa.png';

export const NavBar: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<number | null>(null);

    useEffect(() => {  
        const checkLoggedInStatus = () => {
            const accessToken = localStorage.getItem('accessToken');
            const user = localStorage.getItem('user');
            setIsLoggedIn(!!accessToken);
            if (user) {
                try {
                    const userData = JSON.parse(user);
                    if (userData && userData.roles && userData.roles.length > 0) {
                        setUserRole(userData.roles[0].id);
                    }
                } catch (error) {
                    console.error("Error parsing user data:", error);
                }
            }
        };

        checkLoggedInStatus();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserRole(null);
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

                                            {userRole === 1 && (
                                                <Button variant="contained" onClick={() => navigate("/perfil")}>Perfil</Button>
                                            )}
                                            {userRole === 2 && (
                                                <Button variant="contained" onClick={() => navigate("/mis-servicios")}>Mis Servicios</Button>
                                            )}

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

