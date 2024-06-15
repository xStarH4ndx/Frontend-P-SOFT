import React, { useState } from "react";
import { Button, Container, Divider, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { HeaderComponent } from "../../../components";
import { useNavigate } from "react-router";

export const HomePage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Estado para controlar la pantalla de carga

    const handleClickVerServicios = () => {
        setLoading(true); // Activar la pantalla de carga
        setTimeout(() => {
            setLoading(false); // Desactivar la pantalla de carga después de 1.5 segundos
            navigate("servicios");
        }, 1500); // 1.5 segundos
    };

    return (
        <Container maxWidth="xl">
            <HeaderComponent
                title="Bienvenido"
                description="¡Pide tus servicios ahora!"
                element={
                    <Button fullWidth variant="contained" onClick={handleClickVerServicios}>
                        Ver Todos los Servicios
                    </Button>
                }
            />
            <div>
                <Divider sx={{ marginTop: "20px" }}/>
                <Typography variant="h4" sx={{ textAlign: 'center', mb: 2, mt: 2, pl: { xs: 2, sm: 0 } }}>Servicios Populares</Typography>
            </div>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper sx={{ borderRadius: "1.5em", height: "300px" }}>
                        {/* Contenido del primer Paper */}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper sx={{ borderRadius: "1.5em", height: "300px" }}>
                        {/* Contenido del segundo Paper */}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper sx={{ borderRadius: "1.5em", height: "300px" }}>
                        {/* Contenido del tercer Paper */}
                    </Paper>
                </Grid>
            </Grid>
            <div style={{ marginTop: "50px" }}>
                <Divider />
            </div>

            {/* Pantalla de carga */}
            {loading && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        zIndex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress color="primary" />
                </div>
            )}
        </Container>
    );
};
