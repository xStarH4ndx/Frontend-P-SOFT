import React, { useState } from "react";
import { useNotification } from "../../../tools/context/notification.context";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from '../../../api/graphql/mutations';
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';

type RecoveryType = {
    email: string;
};

export const RecoveryPage: React.FC = () => {
    const { getError, getSuccess } = useNotification();
    const navigate = useNavigate(); // Importa useNavigate y obtén la función navigate
    const [recoveryData, setRecoveryData] = useState<RecoveryType>({
        email: "",
    });

    const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRecoveryData({ ...recoveryData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("Datos enviados:", recoveryData);
            const { data } = await forgotPassword({
                variables: {
                    email: recoveryData.email,
                },
            });
            console.log("Respuesta de la mutación:", data);
            navigate("/resetearPass"); // Redirige a la pantalla de resetPass después de enviar el correo
            getSuccess("Correo enviado con éxito");
        } catch (error: any) {
            console.error("Error en la mutación:", error);
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
                                value={recoveryData.email}
                                onChange={handleChange}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>
                                {loading ? 'Enviando...' : 'Enviar'}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
