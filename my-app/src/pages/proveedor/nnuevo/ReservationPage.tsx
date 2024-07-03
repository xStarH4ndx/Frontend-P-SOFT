import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { OBTENER_SERVICIO } from '../../../api/graphql/queries';

const ReservationPage: React.FC = () => {
    const navigate = useNavigate();
    const { idService } = useParams(); // Obtener el idService desde los parámetros de la URL

    // Estado local para manejar la información del servicio y entradas del usuario
    const [clientName, setClientName] = useState('');
    const [contact, setContact] = useState('');

    // Consultar el servicio por ID usando useQuery de Apollo Client
    const { loading, error, data } = useQuery(OBTENER_SERVICIO, {
        variables: { servicioId: idService ? parseInt(idService) : undefined }, // Convertir a número si idService no es undefined
    });

    // Manejar la función de reserva del servicio
    const handleReservation = () => {
        // Aquí puedes manejar la lógica para reservar el servicio
        console.log('Nombre del cliente:', clientName);
        console.log('Contacto:', contact);
        // Puedes realizar acciones adicionales como enviar datos a un servidor

        // Redirigir a la página de confirmación
        navigate(`/confirmar-servicio/${idService}`);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar el servicio.</p>;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Reservar Servicio
            </Typography>
            <Paper
                sx={{
                    borderRadius: '1.5em',
                    height: 'auto',
                    mt: 3,
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">{`Servicio: ${data.obtenerServicio.nombre}`}</Typography>
                        <Typography variant="body1">{`Costo: ${data.obtenerServicio.costo}`}</Typography>
                        <Typography variant="body1">{`Dirección: ${data.obtenerServicio.direccion}`}</Typography>
                        {/* Otros detalles del servicio */}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre del Cliente"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Contacto"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleReservation}
                        >
                            Reservar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ReservationPage;
