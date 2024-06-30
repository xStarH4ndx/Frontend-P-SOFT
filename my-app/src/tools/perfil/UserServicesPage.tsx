import React, { useState } from 'react';
import { Container, Paper, Grid, Typography, Divider, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router';

export const UserServicePage: React.FC = () => {
    const navigate = useNavigate();
    
    // Estado de los servicios
    const [services, setServices] = useState([
        {
            ID_service: '1',
            Nombre: 'Servicio de Limpieza',
            direccion: 'Calle Falsa 123',
            tipoServicio: 'Limpieza',
            Costo: '$50',
            fotos: ['https://via.placeholder.com/150']
        },
        {
            ID_service: '2',
            Nombre: 'Servicio de Jardinería',
            direccion: 'Calle Verdadera 456',
            tipoServicio: 'Jardinería',
            Costo: '$70',
            fotos: ['https://via.placeholder.com/150']
        }
    ]);

    const handleCreateService = () => {
        navigate('/crear-servicio');
    };

    const handleEditService = (serviceId: string) => {
        navigate(`/editar-servicio/${serviceId}`);
    };

    const handleDeleteService = (serviceId: string) => {
        const updatedServices = services.filter(service => service.ID_service !== serviceId);
        setServices(updatedServices);
    };

    return (
        <Container>
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Mis Servicios</Typography>
                <Button variant="contained" color="primary" onClick={handleCreateService}>
                    Crear Nuevo Servicio
                </Button>
                <Divider sx={{ width: '100%', mb: 2 }} />
                <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
                    {services.length > 0 ? (
                        services.map((service, index) => (
                            <Grid item key={index} sx={{ width: '100%' }}>
                                <Paper sx={{ borderRadius: "1.5em", height: "auto", mt: 3, display: 'flex', alignItems: 'center', p: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {service.fotos.length > 0 && <Avatar src={service.fotos[0]} sx={{ width: 150, height: 150 }} />}
                                        </Grid>
                                        <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Typography variant="h6">{`Servicio: ${service.Nombre}`}</Typography>
                                            <Typography variant="body1">{`ID: ${service.ID_service}`}</Typography>
                                            <Typography variant="body1">{`Dirección: ${service.direccion}`}</Typography>
                                            <Typography variant="body1">{`Tipo: ${service.tipoServicio}`}</Typography>
                                            <Typography variant="body1">{`Costo: ${service.Costo}`}</Typography>
                                        </Grid>
                                        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <Button onClick={() => handleEditService(service.ID_service)} sx={{ mb: 1 }} variant="outlined" color="primary">Editar</Button>
                                            <Button onClick={() => handleDeleteService(service.ID_service)} variant="outlined" color="secondary">Eliminar</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ mt: 4 }}>
                            No hay servicios creados.
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};
