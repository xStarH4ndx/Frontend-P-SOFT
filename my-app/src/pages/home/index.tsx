import React from "react";
import { Button, Container } from '@mui/material';
import { HeaderComponent } from "../../components";


export const HomePage: React.FC<{}> = () =>{
    
    return (
        <Container maxWidth="xl">
            <HeaderComponent 
                title="Bienvenid@" 
                description="¡Pide tus servicios ahora!"
                element={<Button fullWidth variant="contained">Ver Servicios</Button>}
            />
        </Container>
    );
};