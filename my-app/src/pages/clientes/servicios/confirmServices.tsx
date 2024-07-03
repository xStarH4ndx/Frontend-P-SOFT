import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, Paper, Divider, Avatar, TextField, Rating, CircularProgress, Box } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { EVALUAR_SERVICIO, COMENTAR_SERVICIO } from "../../../api/graphql/mutations";

type ReservationData = {
    serviceId: string;
    horario: string;
    userName: string;
    userContact: string;
    additionalInfo?: string;
    fechaInicio: string;
    fechaFin: string;
};

const ConfirmServicePage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { idService, horario, fechaInicio, fechaFin } = useParams<{ idService: string; horario: string; fechaInicio: string; fechaFin: string }>();
    const reservationData = location.state as ReservationData;

    const [newComment, setNewComment] = useState<string>("");
    const [newRating, setNewRating] = useState<number | null>(null);
    const [comments, setComments] = useState<{ comentario: string, usuario: { firstname: string, lastname: string, avatar: string } }[]>([]);
    const [ratings, setRatings] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [addComment] = useMutation(COMENTAR_SERVICIO);
    const [addRating] = useMutation(EVALUAR_SERVICIO);

    useEffect(() => {
        if (reservationData) {
            // Simulación de carga de datos
            setTimeout(() => {
                setComments([
                    { comentario: "¡Excelente servicio!", usuario: { firstname: "Usuario", lastname: "Ejemplo", avatar: "" } }
                ]);
                setRatings([5]);
            }, 1000);
        } else {
            console.error("No se han encontrado los datos de reserva en el estado.");
        }
    }, [reservationData]);

    const handleAddComment = async () => {
        if (newComment.trim() !== "") {
            try {
                const { data } = await addComment({
                    variables: {
                        servicioId: reservationData.serviceId,
                        usuarioId: 21,  // Asegúrate de tener el ID del usuario correcto
                        comentarioDTO: {
                            comentario: newComment,
                            usuario: 21  // Asegúrate de tener el ID del usuario correcto
                        }
                    },
                });
                const nuevoComentario = data.comentarServicio;
                setComments([...comments, nuevoComentario]);
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
                        servicioId: reservationData.serviceId,
                        usuarioId: 21,  // Asegúrate de tener el ID del usuario correcto
                        evaluacionDTO: {
                            puntuacion: newRating,
                            usuario: 21  // Asegúrate de tener el ID del usuario correcto
                        }
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

    const handleViewMoreServices = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/servicios");
        }, 1500);
    };

    const averageRating =
        ratings.length > 0
            ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
            : "No hay evaluaciones";

    return (
        <Container>
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                reservationData ? (
                    <>
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
                                        src={""}  // Asegúrate de tener la imagen correcta
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
                                    <Typography variant="h6">{`Servicio: ${reservationData.serviceId}`}</Typography>
                                    <Typography variant="body1">{`Horario: ${reservationData.horario}`}</Typography>
                                    <Typography variant="body1">{`Fecha de Inicio: ${fechaInicio}`}</Typography>
                                    <Typography variant="body1">{`Fecha de Fin: ${fechaFin}`}</Typography>
                                    <Typography variant="body1">{`Usuario: ${reservationData.userName}`}</Typography>
                                    <Typography variant="body1">{`Contacto: ${reservationData.userContact}`}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper sx={{ mt: 3, p: 2 }}>
                            <Typography variant="h6">Comentarios:</Typography>
                            {comments.length > 0 ? (
                                comments.map((comment, index) => (
                                    <Paper key={index} sx={{ p: 2, mt: 2 }}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Avatar src={comment.usuario.avatar} />
                                            </Grid>
                                            <Grid item xs>
                                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                    {`${comment.usuario.firstname} ${comment.usuario.lastname}`}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {comment.comentario}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                ))
                            ) : (
                                <Typography variant="body2">No hay comentarios aún</Typography>
                            )}
                            <TextField
                                label="Añadir comentario"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={4}
                            />
                            <Button variant="contained" color="primary" onClick={handleAddComment}>
                                Añadir Comentario
                            </Button>
                        </Paper>
                        <Paper sx={{ mt: 3, p: 2 }}>
                            <Typography variant="h6">Evaluaciones:</Typography>
                            <Rating
                                name="average-rating"
                                value={parseFloat(averageRating)}
                                precision={0.1}
                                readOnly
                            />
                            <Typography variant="body2" sx={{ ml: 2 }}>
                                {averageRating} ({ratings.length} evaluaciones)
                            </Typography>
                            <Rating
                                name="new-rating"
                                value={newRating}
                                onChange={(event, newValue) => {
                                    setNewRating(newValue);
                                }}
                            />
                            <Button variant="contained" color="primary" onClick={handleAddRating}>
                                Añadir Evaluación
                            </Button>
                        </Paper>
                        <Box sx={{ mt: 3 }}>
                            <Button variant="outlined" onClick={handleViewMoreServices}>
                                Ver Más Servicios
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography variant="body1">No se encontraron datos de reserva válidos.</Typography>
                )
            )}
        </Container>
    );
};

export default ConfirmServicePage;
