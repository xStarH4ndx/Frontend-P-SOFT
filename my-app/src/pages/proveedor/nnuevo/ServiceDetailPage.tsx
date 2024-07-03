import React, { useState, useRef } from "react";
import { Container, Typography, Grid, Box, Avatar, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

type ServiceType = {
    ID_service: string;
    Nombre: string;
    fotos: string[];
    Costo: number;
    direccion: string;
    tipoServicio: string;
    horarios: string[];
};

interface ServiceDetailPageProps {
    service: ServiceType | null;
    onSave: (updatedService: ServiceType) => void;
    onDelete: () => void;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service, onSave, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedService, setEditedService] = useState<ServiceType | null>(service);
    const [newHorario, setNewHorario] = useState<string>("");
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const handleEditService = () => {
        setIsEditing(true);
        setEditedService(service);
    };

    const handleSaveService = () => {
        if (editedService) {
            if (editedImage) {
                setEditedService({
                    ...editedService,
                    fotos: [editedImage, ...editedService.fotos.slice(1)]
                });
            }
            onSave(editedService);
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedService(service);
        setEditedImage(null);
    };

    const handleDeleteService = () => {
        onDelete();
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

    const handleChangeHorario = (index: number, value: string) => {
        if (editedService) {
            const updatedHorarios = [...editedService.horarios];
            updatedHorarios[index] = value;
            setEditedService({
                ...editedService,
                horarios: updatedHorarios
            });
        }
    };

    const handleDeleteHorario = (index: number) => {
        if (editedService) {
            const updatedHorarios = [...editedService.horarios];
            updatedHorarios.splice(index, 1);
            setEditedService({
                ...editedService,
                horarios: updatedHorarios
            });
        }
    };

    const handleAddHorario = () => {
        if (editedService && newHorario.trim() !== "") {
            setEditedService({
                ...editedService,
                horarios: [...editedService.horarios, newHorario]
            });
            setNewHorario("");
        }
    };

    const handleReserveHour = (horario: string) => {
        navigate(`/reservar/${editedService?.ID_service}/${encodeURIComponent(horario)}`);
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!service) {
        return (
            <Container>
                <Typography variant="h4">Servicio no encontrado</Typography>
            </Container>
        );
    }

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
                            backgroundColor: '#4682B4',
                            cursor: isEditing ? 'pointer' : 'default'
                        }}
                        onClick={isEditing ? handleImageClick : undefined}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        <Avatar
                            src={editedImage || service.fotos[0]}
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
                                    <Typography variant="h6">Editar Horarios:</Typography>
                                    {editedService?.horarios.map((horario, index) => (
                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                            <TextField
                                                value={horario}
                                                onChange={(e) => handleChangeHorario(index, e.target.value)}
                                                fullWidth
                                                margin="normal"
                                            />
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDeleteHorario(index)}
                                                sx={{ ml: 2 }}
                                            >
                                                Eliminar
                                            </Button>
                                        </Box>
                                    ))}
                                    <Box sx={{ mt: 2 }}>
                                        <TextField
                                            value={newHorario}
                                            onChange={(e) => setNewHorario(e.target.value)}
                                            fullWidth
                                            margin="normal"
                                            placeholder="Agregar nuevo horario"
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={handleAddHorario}
                                            sx={{ mt: 1 }}
                                        >
                                            Agregar Horario
                                        </Button>
                                    </Box>
                                </Box>
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
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6">Horarios:</Typography>
                                    {service.horarios.map((horario, index) => (
                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleReserveHour(horario)}
                                                sx={{ borderColor: 'black', color: 'black', mr: 2 }}
                                            >
                                                {horario}
                                            </Button>
                                        </Box>
                                    ))}
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



