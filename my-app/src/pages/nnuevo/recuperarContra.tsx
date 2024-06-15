import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';
import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from '../../api/graphql/mutations';
import { useNotification } from "../../tools/context/notification.context";

type RecoveryType = {
    email: string;
};

export const RecoveryPage: React.FC = () => {
    const { getError, getSuccess } = useNotification();
    const [recoveryData, setRecoveryData] = useState<RecoveryType>({
        email: "",
    });

    const [forgotPassword, { loading, error, data }] = useMutation(FORGOT_PASSWORD);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRecoveryData({ ...recoveryData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("Datos enviados:", recoveryData); // Depuración: Ver los datos enviados
            const response = await forgotPassword({
                variables: {
                    email: recoveryData.email,
                },
            });
            console.log("Respuesta de la mutación:", response); // Depuración: Ver la respuesta
            getSuccess("Correo enviado con éxito");
        } catch (error: any) {
            console.error("Error en la mutación:", error); // Depuración: Ver el error
            getError("Error al enviar el correo");
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
                        <Typography variant="h4">Recuperar Contraseña</Typography>
                        <Box component="form" onSubmit={handleSubmit}>
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
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>
                                Enviar
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
