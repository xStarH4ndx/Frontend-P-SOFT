import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

type ReservationData = {
    serviceId: string;
    horario: string;
    userName: string;
    userContact: string;
    additionalInfo?: string;
};

const ReservationPage: React.FC = () => {
    const { id_servicio, horario } = useParams<{ id_servicio: string; horario: string }>();
    const [userName, setUserName] = useState("");
    const [userContact, setUserContact] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const navigate = useNavigate();

    const handleSave = () => {
        const reservationData: ReservationData = {
            serviceId: id_servicio!,
            horario: horario!,
            userName,
            userContact,
            additionalInfo,
        };

        // Aquí puedes manejar la lógica para guardar la reserva, por ejemplo, enviando los datos a un servidor.
        console.log("Datos de la reserva:", reservationData);

        // Después de guardar la reserva, puedes redirigir al usuario a otra página.
        navigate(`/detalle-servicio/${id_servicio}`);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Reservar Servicio
            </Typography>
            <Typography variant="h6" gutterBottom>
                Horario Seleccionado: {horario}
            </Typography>
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
