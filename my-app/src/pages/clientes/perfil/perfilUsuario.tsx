import React from "react";
import { Container, Grid, Paper, Typography, TextField, Button } from "@mui/material";

export const Perfil: React.FC<{}> = () => {
    // Aquí puedes inicializar el estado para la información del usuario, por ejemplo:
    const [userData, setUserData] = React.useState({
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        // Otros campos de usuario
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        // Lógica para enviar los datos actualizados al backend usando la mutación
        console.log("Enviar datos actualizados al backend:", userData);
    };

    return (
        <Container maxWidth="sm">
            <Grid container spacing={2}>
                {/* Sección de foto de perfil (izquierda) */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} style={{ padding: "1em", textAlign: "center" }}>
                        {/* Aquí puedes agregar la foto de perfil */}
                        <Typography variant="h5">Foto de perfil</Typography>
                        {/* Ejemplo de imagen de avatar */}
                        <img src="https://via.placeholder.com/150" alt="Avatar" style={{ maxWidth: "100%" }} />
                    </Paper>
                </Grid>

                {/* Sección de información de usuario (derecha) */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} style={{ padding: "1em" }}>
                        <Typography variant="h5">Información de usuario</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="firstname"
                                label="Nombre"
                                fullWidth
                                value={userData.firstname}
                                onChange={handleInputChange}
                                margin="normal"
                                variant="outlined"
                                style={{ marginBottom: "1em" }}
                            />
                            <TextField
                                name="lastname"
                                label="Apellido"
                                fullWidth
                                value={userData.lastname}
                                onChange={handleInputChange}
                                margin="normal"
                                variant="outlined"
                                style={{ marginBottom: "1em" }}
                            />
                            <TextField
                                name="email"
                                label="Correo electrónico"
                                fullWidth
                                value={userData.email}
                                onChange={handleInputChange}
                                margin="normal"
                                variant="outlined"
                                style={{ marginBottom: "1em" }}
                            />
                            {/* Agregar más campos según la estructura de tu usuario */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: "1em" }}
                            >
                                Guardar cambios
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
