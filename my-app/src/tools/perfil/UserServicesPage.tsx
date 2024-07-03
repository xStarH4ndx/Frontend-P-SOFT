import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Paper, Typography, Box, Grid, Button, Avatar } from "@mui/material";

const services = [
    {
        ID_service: '1',
        Nombre: 'Servicio de Limpieza',
        direccion: 'Calle Falsa 123',
        tipoServicio: 'Limpieza',
        Costo: 50,
        fotos: ['https://via.placeholder.com/150']
    },
    {
        ID_service: '2',
        Nombre: 'Servicio de Jardinería',
        direccion: 'Calle Verdadera 456',
        tipoServicio: 'Jardinería',
        Costo: 70,
        fotos: ['https://via.placeholder.com/150']
    }
];

const UserServicePage: React.FC = () => {
    const navigate = useNavigate();

    const handleEditService = (serviceId: string) => {
        navigate(`/editar-servicio/${serviceId}`);
    };

    const handleCreateService = () => {
        navigate("/crear-servicio");
    };

    const handleDeleteService = (serviceId: string) => {
        const updatedServices = services.filter(service => service.ID_service !== serviceId);
        console.log(updatedServices);
        // Aquí deberías actualizar el estado o realizar una solicitud al servidor para reflejar la eliminación
    };

    return (
        <Container>
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Mis Servicios</Typography>
                <Button variant="contained" color="primary" onClick={handleCreateService}>
                    Crear Nuevo Servicio
                </Button>
                <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ mt: 2, width: '100%' }}>
                    {services.length > 0 ? (
                        services.map((service) => (
                            <Link to={`/servicio/${service.ID_service}`} key={service.ID_service} style={{ textDecoration: 'none', width: '100%' }}>
                                <Grid item sx={{ width: "100%", mb: 2 }}>
                                    <Paper sx={{ padding: "1em", borderRadius: "0.5em", cursor: 'pointer' }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {service.fotos.length > 0 && <Avatar src={service.fotos[0]} sx={{ width: 100, height: 100 }} />}
                                            </Grid>
                                            <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <Typography variant="h5">{service.Nombre}</Typography>
                                                <Typography variant="subtitle1">{service.direccion}</Typography>
                                                <Typography variant="body1">{`Tipo: ${service.tipoServicio}`}</Typography>
                                                <Typography variant="body1">{`Costo: $${service.Costo}`}</Typography>
                                            </Grid>
                                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <Box>
                                                    <Button 
                                                        variant="contained" 
                                                        sx={{ mt: 1, mr: 1 }} 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleEditService(service.ID_service);
                                                        }}
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button 
                                                        variant="contained" 
                                                        sx={{ mt: 1, mr: 1 }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDeleteService(service.ID_service);
                                                        }}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                    <Button 
                                                        variant="contained" 
                                                        sx={{ mt: 1 }}
                                                    >
                                                        Ver Detalles
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Link>
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

export default UserServicePage;
