import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from "../../../tools/context/notification.context";
import { UPDATE_PASSWORD_BY_CODE } from '../../../api/graphql/mutations';
import { useMutation } from '@apollo/client';
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';

type ResetPasswordType = {
    code: string;
    newPassword: string;
};

export const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const { getError, getSuccess } = useNotification();
    const { code } = useParams(); // Obtenemos el código de la URL
    const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordType>({
        code: code || "",
        newPassword: "",
    });

    // Utilizamos useMutation para manejar la mutación de reseteo de contraseña
    const [resetPassword, { loading, error }] = useMutation(UPDATE_PASSWORD_BY_CODE);

    // Manejamos el cambio en los campos de código y nueva contraseña
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResetPasswordData({ ...resetPasswordData, [name]: value });
    };

    // Manejamos el envío del formulario de reseteo de contraseña
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Realizamos la mutación para resetear la contraseña
            const response = await resetPassword({
                variables: {
                    code: resetPasswordData.code,
                    password: resetPasswordData.newPassword,
                },
            });

            if (response.data && response.data.updatePasswordByCode) {
                getSuccess("Contraseña cambiada exitosamente");
                navigate("/login"); // Redirección a la página de inicio de sesión
            } else {
                getError("Error codigo");
            }
        } catch (error: any) {
            // Si hay un error en la mutación, mostramos un mensaje de error
            console.error("Error en la mutación:", error);
            getError("Error al cambiar la contraseña");
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
                        <Typography variant="h4">Cambiar Contraseña</Typography>
                        {/* Formulario para ingresar código y nueva contraseña */}
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                name="code"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Código de Verificación"
                                value={resetPasswordData.code}
                                onChange={handleChange}
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                            />
                            <TextField
                                name="newPassword"
                                margin="normal"
                                type="password"
                                fullWidth
                                label="Nueva Contraseña"
                                value={resetPasswordData.newPassword}
                                onChange={handleChange}
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                            />
                            {/* Botón para enviar la solicitud de cambio de contraseña */}
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>
                                {loading ? 'Cargando...' : 'Cambiar Contraseña'}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
