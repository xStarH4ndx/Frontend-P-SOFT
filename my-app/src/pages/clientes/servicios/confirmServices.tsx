import React, { useState } from 'react';
import { Container, Typography, Paper, Grid, TextField, Button, Rating } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { OBTENER_SERVICIO } from '../../../api/graphql/queries';
import { EVALUAR_SERVICIO, COMENTAR_SERVICIO } from '../../../api/graphql/mutations'; // Ajusta la ruta según tu estructura de archivos

const ConfirmServicePage: React.FC = () => {
    const { idService } = useParams(); // Obtener el idService desde los parámetros de la URL
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState<number | null>(0); // Valor inicial para las estrellas

    // Consultar el servicio por ID usando useQuery de Apollo Client
    const { loading, error, data } = useQuery(OBTENER_SERVICIO, {
        variables: { servicioId: parseInt(idService!) }
    });

    // Mutaciones de GraphQL
    const [evaluarServicio] = useMutation(EVALUAR_SERVICIO); // Utiliza la definición de mutación EVALUAR_SERVICIO
    const [comentarServicio] = useMutation(COMENTAR_SERVICIO); // Utiliza la definición de mutación COMENTAR_SERVICIO

    // Función para manejar el envío del comentario
    const handleCommentSubmit = async () => {
        try {
            // Ejecutar la mutación para comentar el servicio
            await comentarServicio({
                variables: { comentario: comment, servicioId: parseInt(idService!), usuarioId: 1 } // Ajusta el usuarioId según tu lógica
            });
            // Limpiar el campo de comentario después de enviar
            setComment('');
        } catch (error) {
            console.error('Error al enviar comentario:', error);
        }
    };

    // Función para manejar la evaluación del servicio
    const handleRatingChange = async (newRating: number | null) => {
        try {
            // Ejecutar la mutación para evaluar el servicio
            await evaluarServicio({
                variables: { servicioId: parseInt(idService!), usuarioId: 1, puntuacion: newRating || 0 } // Ajusta el usuarioId según tu lógica
            });
            // Actualizar el estado de la valoración
            setRating(newRating);
        } catch (error) {
            console.error('Error al evaluar servicio:', error);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar el servicio.</p>;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                ¡Servicio Confirmado!
            </Typography>
            {/* Detalles del servicio */}
            <Paper sx={{ p: 2, mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography variant="h6">Detalles del Servicio</Typography>
                        <Typography variant="body1">{`Nombre del Servicio: ${data.obtenerServicio.nombre}`}</Typography>
                        <Typography variant="body1">{`Costo: ${data.obtenerServicio.costo}`}</Typography>
                        <Typography variant="body1">{`Dirección: ${data.obtenerServicio.direccion}`}</Typography>
                        {/* Otros detalles del servicio según tu estructura de datos */}
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6">Precio</Typography>
                        <Typography variant="body1">{`$${data.obtenerServicio.costo}`}</Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Sección de comentarios y evaluación */}
            <Paper sx={{ mt: 3, p: 2 }}>
                <Typography variant="h6">Comentarios</Typography>
                {/* Listado de comentarios */}
                {data.obtenerServicio.comentarios.map((comentario: any) => (
                    <Typography key={comentario.id} variant="body1">{comentario.comentario}</Typography>
                ))}

                {/* Formulario para comentar */}
                <TextField
                    label="Publicar comentario"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
                    Enviar comentario
                </Button>

                {/* Valoración del servicio */}
                <Typography variant="h6" sx={{ mt: 3 }}>Valoración del Servicio</Typography>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => {
                        handleRatingChange(newValue);
                    }}
                />
            </Paper>
        </Container>
    );
};

export default ConfirmServicePage;
