import React from "react";
import { Button, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import { HeaderComponent } from "../../../components";
import { useNavigate } from "react-router";

export const HomePage: React.FC<{}> = () =>{
    const navigate = useNavigate()
    return (
        <Container maxWidth="xl">
            <HeaderComponent
                title="Bienvenido"
                description="¡Pide tus servicios ahora!"
                element={<Button fullWidth variant="contained" onClick={()=> navigate("servicios")}>Ver Todos los Servicios</Button>}
            />
            <div>
                <Divider sx={{ marginTop: "20px" }}/>
                <Typography variant="h4" sx={{ textAlign: 'center', mb: 2, mt: 2, pl: { xs: 2, sm: 0 } }}>Servicios Populares</Typography>
            </div>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={4} lg={3}> {/* Cada papel ocupará 1/3 del ancho del contenedor */}
                    <Paper sx={{borderRadius:"1.5em", height:"300px"}}>
                        {/* Contenido del primer Paper */}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper sx={{borderRadius:"1.5em", height:"300px"}}>
                        {/* Contenido del segundo Paper */}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper sx={{borderRadius:"1.5em", height:"300px"}}>
                        {/* Contenido del tercer Paper */}
                    </Paper>
                </Grid>
            </Grid>
            <div style={{marginTop:"50px"}}>
                <Divider/>
            </div>
        </Container>
    );
};
