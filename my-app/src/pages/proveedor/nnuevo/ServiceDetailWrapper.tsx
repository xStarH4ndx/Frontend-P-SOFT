import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, CircularProgress, Snackbar, Paper, Avatar } from '@mui/material';
import { useMutation } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { ACTUALIZAR_SERVICIO } from '../../../api/graphql/mutations';

interface LocationState {
    id: number;
    nombre: string;
    costo: number;
    direccion: string;
    autorNombreCompleto: string;
    comentarios: string;
    evaluaciones: number;
    imagenUrl: string;
    fechaInicio?: string;
    fechaFin?: string;
}

const ServiceDetailWrapper: React.FC<{}> = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Hook de React Router para la navegación
    const {
        id,
        nombre,
        costo,
        direccion,
        autorNombreCompleto,
        comentarios,
        evaluaciones,
        imagenUrl,
        fechaInicio: initialFechaInicio,
        fechaFin: initialFechaFin,
    } = location.state as LocationState;

    const [fechaInicio, setFechaInicio] = useState<string>(initialFechaInicio || '');
    const [fechaFin, setFechaFin] = useState<string>(initialFechaFin || '');
    const [loading, setLoading] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [actualizarServicio] = useMutation(ACTUALIZAR_SERVICIO);

    // Función para manejar la asignación de horarios
    const handleAssignSchedule = async () => {
        setLoading(true);
        try {
            const { data } = await actualizarServicio({
                variables: {
                    servicioDTO: {
                        id,
                        nombre,
                        autor: 4, // Aquí deberías usar el autor dinámico obtenido previamente
                        fechaInicio,
                        fechaFin,
                        costo,
                        direccion,
                    },
                },
            });
            console.log('Servicio actualizado:', data);
            setSnackbarOpen(true);

            // Después de actualizar el servicio, navegar a la página de reserva con los datos actualizados
            navigate(`/reservar-servicio/${id}/${fechaInicio}`);
        } catch (error: any) {
            console.error('Error al actualizar el servicio:', error);
            // Manejo de errores
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Detalles del Servicio
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
                            <Grid
                                item
                                xs={3}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar
                                    src={imagenUrl}
                                    sx={{ width: 150, height: 150 }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="h6">{`Servicio: ${nombre}`}</Typography>
                                <Typography variant="body1">{`Autor: ${autorNombreCompleto}`}</Typography>
                                <Typography variant="body1">{`Costo: ${costo}`}</Typography>
                                <Typography variant="body1">{`Dirección: ${direccion}`}</Typography>
                                <Typography variant="body1">{`Evaluaciones: ${evaluaciones}`}</Typography>
                                <Typography variant="body1">{`Comentarios: ${comentarios}`}</Typography>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                <TextField
                                    label="Fecha Inicio"
                                    type="datetime-local"
                                    variant="outlined"
                                    value={fechaInicio}
                                    onChange={(e) => setFechaInicio(e.target.value)}
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="Fecha Fin"
                                    type="datetime-local"
                                    variant="outlined"
                                    value={fechaFin}
                                    onChange={(e) => setFechaFin(e.target.value)}
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAssignSchedule}
                                    disabled={loading}
                                >
                                    Asignar Horario
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            {loading && (
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 1,
                    }}
                >
                    <CircularProgress color="primary" />
                </Grid>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Horario Asignado"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
        </Container>
    );
};

export default ServiceDetailWrapper;
