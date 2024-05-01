import React from "react";
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';


export const LoginPage: React.FC<{}> = () =>{
    return (
        <Container maxWidth="xl">
            <Grid container 
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{minHeight: "100vh"}}
            >
                <Grid item>
                    <Paper sx={{padding:"1.2em", borderRadius:"0.5em"}}>
                        <Typography variant="h4">Iniciar Sesion</Typography>
                        <Box component="form">
                            <TextField/>
                            <TextField/>
                            <Button type="submit">Iniciar Sesion</Button>
                        </Box>
                    </Paper>

                </Grid>
            </Grid>
        </Container>
    );
};