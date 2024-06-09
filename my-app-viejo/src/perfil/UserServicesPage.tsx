import React from 'react';
import { Container, Paper, Grid, Typography, Divider, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router';
import { useUserContext } from './UserContext';

export const UserServicePage: React.FC = () => {
    const navigate = useNavigate();
    const { user, services, setServices } = useUserContext();

    const handleCreateService = () => {
        navigate('/crear-servicio');
    };

    const handleEditService = (serviceId: string) => {
        // Redirigir a la página de edición del servicio con el ID del servicio
        navigate(`/editar-servicio/${serviceId}`);
    };

    const handleDeleteService = (serviceId: string) => {
        // Eliminar el servicio con el ID proporcionado
        const updatedServices = services.filter(service => service.ID_service !== serviceId);
        setServices(updatedServices);
        // Aquí podrías realizar una solicitud al servidor para eliminar el servicio permanentemente
    };

    // Filtrar servicios por el usuario actualmente autenticado
    const userServices = services.filter(service => service.usuario === user?.username);

    return (
        <Container>
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Mis Servicios</Typography>
                <Button variant="contained" color="primary" onClick={handleCreateService}>
                    Crear Nuevo Servicio
                </Button>
                <Divider sx={{ width: '100%', mb: 2 }} />
                <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
                    {userServices.length > 0 ? (
                        userServices.map((service, index) => (
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
                                            <Button onClick={() => handleEditService(service.ID_service)}>Editar</Button>
                                            <Button onClick={() => handleDeleteService(service.ID_service)}>Eliminar</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ mt: 4 }}>
                            No has creado ningún servicio todavía.
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};
