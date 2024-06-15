import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, Paper, Divider, Avatar, TextField, Rating, Snackbar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { EVALUAR_SERVICIO, COMENTAR_SERVICIO } from "../../graphql/mutations"; // Asegúrate de importar tus mutaciones correctamente

const ConfirmServicePage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const serviceData = location.state;

    const [newComment, setNewComment] = useState<string>("");
    const [newRating, setNewRating] = useState<number | null>(null);
    const [comments, setComments] = useState<string[]>(serviceData.comentarios || []);
    const [ratings, setRatings] = useState<number[]>(serviceData.evaluaciones || []);

    const [addComment] = useMutation(COMENTAR_SERVICIO);
    const [addRating] = useMutation(EVALUAR_SERVICIO);

    useEffect(() => {
        if (serviceData) {
            setComments(serviceData.comentarios || []);
            setRatings(serviceData.evaluaciones || []);
        }
    }, [serviceData]);

    const handleAddComment = async () => {
        if (newComment.trim() !== "") {
            try {
                const { data } = await addComment({
                    variables: {
                        comentario: newComment,
                        servicioId: serviceData.id,
                        usuarioId: serviceData.autor.id, // Asegúrate de tener el ID del usuario correcto aquí
                    },
                });
                const nuevoComentario = data.comentarServicio;
                setComments([...comments, nuevoComentario.comentario]);
                setNewComment("");
            } catch (error) {
                console.error("Error al añadir comentario:", error);
            }
        }
    };

    const handleAddRating = async () => {
        if (newRating !== null) {
            try {
                const { data } = await addRating({
                    variables: {
                        puntuacion: newRating,
                        servicioId: serviceData.id,
                        usuarioId: serviceData.autor.id, // Asegúrate de tener el ID del usuario correcto aquí
                    },
                });
                const nuevaEvaluacion = data.evaluarServicio;
                setRatings([...ratings, nuevaEvaluacion.puntuacion]);
                setNewRating(null);
            } catch (error) {
                console.error("Error al añadir evaluación:", error);
            }
        }
    };

    const averageRating =
        ratings.length > 0
            ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
            : "No hay evaluaciones";

    return (
        <Container>
            <Grid container justifyContent="center">
                <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
                    ¡Solicitud Realizada!
                </Typography>
            </Grid>
            <Divider />
            <Paper sx={{ p: 3, mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={3}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            src={serviceData.img}
                            sx={{ width: 150, height: 150 }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={5}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="h6">{`Servicio: ${
                            serviceData.nombre
                        }`}</Typography>
                        <Typography variant="body1">{`Autor: ${
                            serviceData.autor.firstname
                        } ${serviceData.autor.lastname}`}</Typography>
                        <Typography variant="body1">{`Dirección: ${
                            serviceData.direccion
                        }`}</Typography>
                        <Typography variant="body1">{`Ranking: ${averageRating}`}</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Divider sx={{ mb: 1 }} />
                        <Typography
                            variant="h6"
                            sx={{ color: "#1d4ed8", mb: 2 }}
                        >{`Precio: ${serviceData.costo} CLP`}</Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => navigate("/servicios")}
                            >
                                Ver Servicios
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{ mt: 3, p: 2 }}>
                <Typography variant="h6">Comentarios:</Typography>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <Typography key={index} variant="body1">
                            {comment}
                        </Typography>
                    ))
                ) : (
                    <Typography variant="body2">No hay comentarios aún.</Typography>
                )}
                <TextField
                    label="Añadir comentario"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddComment}
                    sx={{ mt: 1 }}
                >
                    Añadir Comentario
                </Button>
            </Paper>
            <Paper sx={{ mt: 3, p: 2 }}>
                <Typography variant="h6">Evaluación:</Typography>
                <Rating
                    name="simple-controlled"
                    value={newRating}
                    onChange={(event, newValue) => {
                        setNewRating(newValue);
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddRating}
                    sx={{ mt: 1 }}
                >
                    Añadir Evaluación
                </Button>
            </Paper>
        </Container>
    );
};

export default ConfirmServicePage;
