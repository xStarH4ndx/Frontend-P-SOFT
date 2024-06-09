import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';
import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations';
import { useNotification } from "../../context/notification.context";
import { useNavigate } from "react-router-dom";

type LoginType = {
    username: string;
    password: string;
};

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { getError, getSuccess } = useNotification();
    const [loginData, setLoginData] = useState<LoginType>({
        username: "",
        password: "",
    });

    const [login, { loading, error, data }] = useMutation(LOGIN);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("Datos enviados:", loginData); // Depuración: Ver los datos enviados
            const response = await login({
                variables: {
                    username: loginData.username,
                    password: loginData.password,
                },
            });
            console.log("Respuesta de la mutación:", response); // Depuración: Ver la respuesta
            getSuccess("Inicio de sesión exitoso");
            navigate("/dashboard"); // Redirige a la página principal
        } catch (error: any) {
            console.error("Error en la mutación:", error); // Depuración: Ver el error
            getError("Usuario o contraseña incorrectos");
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
