import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';
import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { CREAR_USUARIO } from '../../graphql/mutations';
import { useNotification } from "../../context/notification.context";
import { useNavigate } from "react-router-dom";

type RegisterType = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
};

export const RegisterPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const { getError, getSucces } = useNotification();
    const [registerData, setRegisterData] = useState<RegisterType>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });

    const [crearUsuario, { loading, error, data }] = useMutation(CREAR_USUARIO);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            getError("Las contraseñas no coinciden");
            return;
        }
        try {
            const response = await crearUsuario({
                variables: {
                    usuario: {
                        username: registerData.username,
                        password: registerData.password,
                        firstname: registerData.username,
                        lastname: "",
                        telephone: registerData.phone,
                        enabled: true,
                        accountLocked: false,
                        roles: []
                    }
                }
            });
            getSucces("Registro exitoso");
            navigate("/login"); // Redirige a la página de inicio de sesión
        } catch (error: any) {
            getError(`El correo ya está registrado`);
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
                                name="phone"
                                margin="normal"
                                fullWidth
                                label="Telefono"
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
