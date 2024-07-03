import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

type ReservationData = {
    serviceId: string;
    userName: string;
    userContact: string;
    additionalInfo?: string;
    fechaInicio: string;
    fechaFin: string;
    id: number;
    nombre: string;
    costo: number;
    direccion: string;
    autorNombreCompleto: string;
    comentarios: string;
    evaluaciones: number;
    imagenUrl: string;
};

const ReservationPage: React.FC = () => {
    const { id_servicio, fechaInicio, fechaFin } = useParams<{ id_servicio: string; fechaInicio: string; fechaFin: string }>();
    const [userName, setUserName] = useState("");
    const [userContact, setUserContact] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const navigate = useNavigate();

    // Obtener la información del servicio desde la ubicación
    const locationState = window.history.state.state as ReservationData;

    // Manejar la reserva del servicio
    const handleSave = () => {
        const reservationData: ReservationData = {
            serviceId: id_servicio!,
            userName,
            userContact,
            additionalInfo,
            fechaInicio: locationState.fechaInicio,
            fechaFin: locationState.fechaFin,
            id: locationState.id,
            nombre: locationState.nombre,
            costo: locationState.costo,
            direccion: locationState.direccion,
            autorNombreCompleto: locationState.autorNombreCompleto,
            comentarios: locationState.comentarios,
            evaluaciones: locationState.evaluaciones,
            imagenUrl: locationState.imagenUrl,
        };

        // Aquí puedes manejar la lógica para guardar la reserva, por ejemplo, enviando los datos a un servidor.
        console.log("Datos de la reserva:", reservationData);

        // Navegar a ConfirmServicePage y pasar los datos de la reserva como estado de ubicación
        navigate(`/confirmar-servicio/${id_servicio}/${locationState.fechaInicio}`, { state: { ...reservationData } });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Reservar Servicio
            </Typography>
            <Typography variant="h6" gutterBottom>
                Servicio Seleccionado: {locationState?.nombre}
            </Typography>
            <Typography variant="body1">Costo: {locationState?.costo}</Typography>
            <Typography variant="body1">Dirección: {locationState?.direccion}</Typography>
            <Typography variant="body1">Evaluaciones: {locationState?.evaluaciones}</Typography>
            <Typography variant="body1">Autor: {locationState?.autorNombreCompleto}</Typography>
            <Typography variant="body1">Comentarios: {locationState?.comentarios}</Typography>
            <TextField
                label="Nombre"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Contacto"
                value={userContact}
                onChange={(e) => setUserContact(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Información Adicional"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Confirmar Reserva
                </Button>
            </Box>
        </Container>
    );
};

export default ReservationPage;
