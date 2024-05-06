import React from "react";
import { Button, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import { HeaderComponent } from "../../components";

export const HomePage: React.FC<{}> = () =>{
    
    return (
        <Container maxWidth="xl">
            <HeaderComponent 
                title="Bienvenido"
                description="¡Pide tus servicios ahora!"
                element={<Button fullWidth variant="contained">Ver Todos los Servicios</Button>}
            />
            <div>
                <Typography variant="h4">Servicios Populares</Typography>
                <Divider sx={{marginTop:"10px"}}/>
            </div>
            <Grid container spacing={4} justifyContent="center" sx={{marginTop:"10px"}}> {/* Utiliza el contenedor Grid para organizar los papeles */}
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
