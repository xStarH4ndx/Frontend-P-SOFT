import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, TextField, Button, Grid, Typography, Paper, Box } from '@mui/material';
import { useUserContext } from './UserContext';

const EditServicePage: React.FC = () => {
    const navigate = useNavigate();
    const { serviceId } = useParams<{ serviceId: string }>();
    const { services, setServices } = useUserContext();
    const [service, setService] = useState(() => services.find(s => s.ID_service === serviceId) || null);

    useEffect(() => {
        if (!service) {
            navigate('/');
        }
    }, [service, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setService(prevService => prevService ? { ...prevService, [name]: value } : prevService);
    };

    const handleSave = () => {
        if (service) {
            setServices(prevServices => prevServices.map(s => s.ID_service === serviceId ? service : s));
        }
        navigate('/');
    };

    if (!service) {
        return null;
    }

    return (
        <Container maxWidth="sm">
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "100vh" }}>
                <Grid item>
                    <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                        <Typography variant="h4">Editar Servicio</Typography>
                        <Box component="form" onSubmit={handleSave as unknown as React.FormEventHandler<HTMLFormElement>}>
                            <TextField
                                name="Nombre"
                                margin="normal"
                                fullWidth
                                label="Nombre del Servicio"
                                sx={{ mt: 2, mb: 1.5 }}
                                value={service.Nombre}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                name="direccion"
                                margin="normal"
                                fullWidth
                                label="Dirección del Servicio"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                value={service.direccion}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                name="tipoServicio"
                                margin="normal"
                                fullWidth
                                label="Tipo de Servicio"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                value={service.tipoServicio}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                name="Costo"
                                margin="normal"
                                fullWidth
                                label="Precio del Servicio"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                value={service.Costo}
                                onChange={handleChange}
                                required
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>Guardar Cambios</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditServicePage;
