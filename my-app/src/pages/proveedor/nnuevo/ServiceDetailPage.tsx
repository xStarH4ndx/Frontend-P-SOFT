import React, { useState } from "react";
import { Container, Typography, Grid, Box, Avatar, Button, TextField } from "@mui/material";

type ServiceType = {
    ID_service: string;
    Nombre: string;
    fotos: string[];
    Costo: number;
    direccion: string;
    tipoServicio: string;
};

interface ServiceDetailPageProps {
    service: ServiceType | null;
    onSave: (updatedService: ServiceType) => void;
    onDelete: () => void;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service, onSave, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedService, setEditedService] = useState<ServiceType | null>(service);

    if (!service) {
        return (
            <Container>
                <Typography variant="h4">Servicio no encontrado</Typography>
            </Container>
        );
    }

    const handleEditService = () => {
        setIsEditing(true);
    };

    const handleSaveService = () => {
        if (editedService) {
            onSave(editedService);
            setIsEditing(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editedService) {
            setEditedService({
                ...editedService,
                [name]: name === 'Costo' ? Number(value) : value
            });
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedService(service); // Reiniciar cambios
    };

    const handleDeleteService = () => {
        onDelete();
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            width: '100%',
                            height: 0,
                            paddingBottom: '100%',
                            position: 'relative',
                            backgroundColor: '#4682B4' // Celeste más oscuro
                        }}
                    >
                        {service.fotos.length > 0 && (
                            <Avatar
                                src={service.fotos[0]}
                                variant="square"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    borderRadius: '0.5em'
                                }}
                            />
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box sx={{ backgroundColor: '#4682B4', padding: 2, borderRadius: '0.5em' }}>
                        {isEditing ? (
                            <>
                                <TextField
                                    name="Nombre"
                                    label="Nombre del Servicio"
                                    value={editedService?.Nombre}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    name="ID_service"
                                    label="ID del Servicio"
                                    value={editedService?.ID_service}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    name="direccion"
                                    label="Dirección"
                                    value={editedService?.direccion}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    name="tipoServicio"
                                    label="Tipo de Servicio"
                                    value={editedService?.tipoServicio}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    name="Costo"
                                    label="Costo"
                                    value={editedService?.Costo}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                />
                                <Box sx={{ mt: 2 }}>
                                    <Button variant="contained" color="primary" onClick={handleSaveService} sx={{ mr: 2 }}>Guardar</Button>
                                    <Button variant="contained" onClick={handleCancelEdit}>Cancelar</Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Typography variant="h5" gutterBottom>Nombre del servicio: {service.Nombre}</Typography>
                                <Typography variant="body1">ID del Servicio: {service.ID_service}</Typography>
                                <Typography variant="body1">Dirección: {service.direccion}</Typography>
                                <Typography variant="body1">Tipo de Servicio: {service.tipoServicio}</Typography>
                                <Typography variant="body1">Costo: ${service.Costo}</Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Button variant="contained" color="primary" onClick={handleEditService} sx={{ mr: 2 }}>
                                        Editar
                                    </Button>
                                    <Button variant="contained" color="error" onClick={handleDeleteService}>
                                        Eliminar
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ServiceDetailPage;


