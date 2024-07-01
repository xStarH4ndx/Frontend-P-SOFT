// ServiceDetailPage.tsx
import React from "react";
import { Container, Typography, Grid, Box, Avatar, Button } from "@mui/material";

type ServiceType = {
    ID_service: string;
    Nombre: string;
    fotos: string[];
    Costo: number;
    direccion: string;
    tipoServicio: string;
};

interface ServiceDetailPageProps {
    service: ServiceType | null;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service }) => {
    if (!service) {
        return (
            <Container>
                <Typography variant="h4">Servicio no encontrado</Typography>
            </Container>
        );
    }

    const handleEditService = () => {
        // Aquí debes implementar la lógica para editar el servicio
    };

    const handleDeleteService = () => {
        // Aquí debes implementar la lógica para eliminar el servicio
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            width: '100%',
                            height: 0,
                            paddingBottom: '100%',
                            position: 'relative',
                            backgroundColor: '#4682B4' // Celeste más oscuro
                        }}
                    >
                        {service.fotos.length > 0 && (
                            <Avatar
                                src={service.fotos[0]}
                                variant="square"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    borderRadius: '0.5em'
                                }}
                            />
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box sx={{ backgroundColor: '#4682B4', padding: 2, borderRadius: '0.5em' }}>
                        <Typography variant="h5" gutterBottom>Nombre del servicio: {service.Nombre}</Typography>
                        <Typography variant="body1">ID del Servicio: {service.ID_service}</Typography>
                        <Typography variant="body1">Dirección: {service.direccion}</Typography>
                        <Typography variant="body1">Tipo de Servicio: {service.tipoServicio}</Typography>
                        <Typography variant="body1">Costo: ${service.Costo}</Typography>
                        <Box sx={{ mt: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleEditService} sx={{ mr: 2 }}>Editar</Button>
                            <Button variant="contained" color="secondary" onClick={handleDeleteService}>Eliminar</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ServiceDetailPage;
