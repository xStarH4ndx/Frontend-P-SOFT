import React, { useState } from "react";
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';

type RecoveryType = {
    email: string;
};

export const RecoveryPage: React.FC<{}> = () => {
    const [recoveryData, setRecoveryData] = useState<RecoveryType>({
        email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRecoveryData({ ...recoveryData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(recoveryData.email);
        // Aquí podrías enviar los datos a tu servidor para procesar la solicitud de recuperación de contraseña
        // Por ejemplo, puedes llamar a una API para enviar un correo con instrucciones para restablecer la contraseña
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
                                sx={{ mt: 2, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>Enviar Correo de Recuperación</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
