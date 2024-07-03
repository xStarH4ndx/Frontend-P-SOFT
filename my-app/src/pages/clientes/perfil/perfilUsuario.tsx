import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { Container, Grid, Paper, Typography, TextField, Button, IconButton, Box, Avatar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { OBTENER_USUARIO } from '../../../api/graphql/queries';
import { EDITAR_USUARIO } from '../../../api/graphql/mutations';

export const Perfil: React.FC<{}> = () => {
    const userId = localStorage.getItem('userId'); // Obtener userId desde localStorage
    const { loading, error, data } = useQuery(OBTENER_USUARIO, { variables: { id: Number(userId) } });
    const [editarUsuario] = useMutation(EDITAR_USUARIO);
    const [loadingEdit, setLoadingEdit] = useState(false);

    const [userData, setUserData] = useState({
        id: 0,
        firstname: "",
        lastname: "",
        username: "",
        telephone: "",
        roles: [],
    });

    const [isEditing, setIsEditing] = useState({
        firstname: false,
        lastname: false,
        username: false,
        telephone: false,
    });

    useEffect(() => {
        if (data && data.obtenerUsuario) {
            const { id, firstname, lastname, username, telephone, roles } = data.obtenerUsuario;
            setUserData({ id, firstname, lastname, username, telephone, roles });
        }
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleEditClick = (field: string) => {
        setIsEditing({
            ...isEditing,
            [field]: !isEditing[field as keyof typeof isEditing],
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingEdit(true);
        try {
            await editarUsuario({
                variables: {
                    usuarioDTO: {
                        id: Number(userId),
                        firstname: userData.firstname,
                        lastname: userData.lastname,
                        username: userData.username,
                        telephone: userData.telephone,
                        roles: userData.roles.length > 0 ? userData.roles.map(role => role[0]) : null, // Manejar roles vacíos
                    }
                }
            });
            
            setLoadingEdit(false);
            console.log("Usuario actualizado con éxito");
        } catch (error) {
            setLoadingEdit(false);
            console.error("Error al actualizar el usuario:", error);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Container maxWidth="sm" style={{ marginTop: '150px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} style={{ padding: "0.76em", textAlign: "center", borderRadius: "100rem", marginTop: "30px" }}>
                        <Avatar
                            src={data.img} // Asegúrate de tener un campo `img` en tu consulta si deseas mostrar una imagen de perfil
                            sx={{ width: 150, height: 150 }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} style={{ padding: "1em", borderRadius: "1.5em" }}>
                        <Typography variant="h5">Información de usuario</Typography>
                        <form onSubmit={handleSubmit}>
                            <Box display="flex" alignItems="center">
                                <TextField
                                    name="firstname"
                                    label="Nombre"
                                    fullWidth
                                    value={userData.firstname}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    variant="standard"
                                    disabled={!isEditing.firstname}
                                />
                                <IconButton onClick={() => handleEditClick('firstname')}>
                                    <EditIcon />
                                </IconButton>
                            </Box>
                            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                                <TextField
                                    name="lastname"
                                    label="Apellido"
                                    fullWidth
                                    value={userData.lastname}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    variant="standard"
                                    disabled={!isEditing.lastname}
                                />
                                <IconButton onClick={() => handleEditClick('lastname')}>
                                    <EditIcon />
                                </IconButton>
                            </Box>
                            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                                <TextField
                                    name="username"
                                    label="Correo electrónico"
                                    fullWidth
                                    value={userData.username}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    variant="standard"
                                    disabled={!isEditing.username}
                                />
                                <IconButton onClick={() => handleEditClick('username')}>
                                    <EditIcon />
                                </IconButton>
                            </Box>
                            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                                <TextField
                                    name="telephone"
                                    label="Teléfono"
                                    fullWidth
                                    value={userData.telephone}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    variant="standard"
                                    disabled={!isEditing.telephone}
                                />
                                <IconButton onClick={() => handleEditClick('telephone')}>
                                    <EditIcon />
                                </IconButton>
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<SaveIcon />}
                                disabled={loadingEdit}
                            >
                                {loadingEdit ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
