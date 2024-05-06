import React, { useState } from "react";
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';

type RegisterType = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthdate: string;
};

export const RegisterPage: React.FC<{}> = () => {
    const [registerData, setRegisterData] = useState<RegisterType>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthdate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        console.log(registerData);
        // Aquí podrías enviar los datos a tu servidor o realizar otras acciones
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
                        <Typography variant="h4">Registrarse</Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                name="username"
                                margin="normal"
                                fullWidth
                                label="Nombre"
                                sx={{ mt: 2, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <TextField
                                name="email"
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
                            <TextField
                                name="confirmPassword"
                                margin="normal"
                                type="password"
                                fullWidth
                                label="Confirmar contraseña"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <TextField
                                name="birthdate"
                                margin="normal"
                                type="date"
                                fullWidth
                                label="Fecha de nacimiento"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}  // Añade esto para que la etiqueta no se solape con el campo vacío
                                defaultValue=""  // Establece el valor por defecto como vacío
                                
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>Registrarse</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
