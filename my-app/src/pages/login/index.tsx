import React, { useState } from "react";
import { useNotification } from "../../tools/context/notification.context";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { getError, getSuccess } = useNotification();
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8090/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            if (response.ok) {
                getSuccess("Inicio de sesión exitoso");
                navigate("/");
            } else {
                getError("Usuario o contraseña incorrectos");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            getError("Ocurrió un error al intentar iniciar sesión");
        }
    };

    return (
        <Container maxWidth="sm">
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "100vh" }}
            >
                <Grid item>
                    <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                        <Typography variant="h4">Iniciar sesión</Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                name="username"
                                margin="normal"
                                type="email"
                                fullWidth
                                label="Correo electrónico"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <TextField
                                name="password"
                                margin="normal"
                                type="password"
                                fullWidth
                                label="Contraseña"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>
                                Iniciar sesión
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
