import React, { useState } from "react";
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from '../../graphql/mutations';
import { useNotification } from "../../context/notification.context";

type RecoveryType = {
    email: string;
};

export const RecoveryPage: React.FC<{}> = () => {
    const { getError, getSucces } = useNotification();
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
            const response = await forgotPassword({
                variables: { email: recoveryData.email }
            });
            getSucces("Correo de recuperación enviado");
        } catch (error: any) {
            getError(`Correo inválido`);
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
                                sx={{ mt: 2, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }} disabled={loading}>
                                {loading ? "Enviando..." : "Enviar Correo de Recuperación"}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
