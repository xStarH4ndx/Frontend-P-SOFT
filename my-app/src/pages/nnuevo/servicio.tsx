import React, { useState } from "react";
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';
import { useUserContext } from '../../perfil/UserContext';

export type ServiceType = {
    ID_service: string;
    Nombre: string;
    fotos: string[];
    Costo: number;
    direccion: string;
    tipoServicio: string;
    usuario: string; // Añadido para identificar el usuario que creó el servicio
};

export const CreateServicePage: React.FC<{}> = () => {
    const [serviceData, setServiceData] = useState<Omit<ServiceType, 'usuario'>>({
        ID_service: "",
        Nombre: "",
        fotos: [],
        Costo: 0,
        direccion: "",
        tipoServicio: "",
    });

    const { user, services, setServices } = useUserContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user) {
            setServices([...services, { ...serviceData, usuario: user.username }]);
        }
        console.log(serviceData);
        // Aquí podrías enviar los datos a tu servidor o realizar otras acciones
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
        const items = event.clipboardData?.items;
        if (items) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.type.includes('image')) {
                    const blob = item.getAsFile();
                    if (blob) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            if (e.target) {
                                const dataUrl = e.target.result as string;
                                setServiceData({ ...serviceData, fotos: [...serviceData.fotos, dataUrl] });
                            }
                        };
                        reader.readAsDataURL(blob);
                    }
                }
            }
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
                        <Typography variant="h4">Crear Servicio</Typography>
                        <Box component="form" onSubmit={handleSubmit}> {/* Agrega el atributo onSubmit */}
                            <TextField
                                name="Nombre"
                                margin="normal"
                                fullWidth
                                label="Nombre del Servicio"
                                sx={{ mt: 2, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <TextField
                                name="ID_service"
                                margin="normal"
                                fullWidth
                                label="ID del Servicio"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <TextField
                                name="direccion"
                                margin="normal"
                                fullWidth
                                label="Dirección del Servicio"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <TextField
                                name="tipoServicio"
                                margin="normal"
                                fullWidth
                                label="Tipo de Servicio"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <TextField
                                name="Costo"
                                margin="normal"
                                fullWidth
                                label="Precio del Servicio"
                                type="number"
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
