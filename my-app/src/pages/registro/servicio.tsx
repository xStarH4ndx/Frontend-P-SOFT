import React, { useState } from "react";
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';

type ServiceType = {
    name: string;
    id: string;
    description: string;
    price: string;
};

export const CreateServicePage: React.FC<{}> = () => {
    const [serviceData, setServiceData] = useState<ServiceType>({
        name: "",
        id: "",
        description: "",
        price: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(serviceData);
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
                        <Typography variant="h4">Crear Servicio</Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                name="name"
                                margin="normal"
                                fullWidth
                                label="Nombre del Servicio"
                                sx={{ mt: 2, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <TextField
                                name="id"
                                margin="normal"
                                fullWidth
                                label="ID del Servicio"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <TextField
                                name="description"
                                margin="normal"
                                fullWidth
                                label="Descripción del Servicio"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <TextField
                                name="price"
                                margin="normal"
                                fullWidth
                                label="Precio del Servicio"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>Crear Servicio</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
