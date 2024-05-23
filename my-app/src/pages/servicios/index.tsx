import React, { useState } from "react";
import { Container, Paper, Grid, Typography, Divider, TextField, Button, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from "react-router";

const elementos = [
    { servicio: "Informática", nombre: "Juan Perez", edad: 30, ubicacion: "Ciudad A", ranking: 4.5, img: "https://via.placeholder.com/150", descripcion: "Hago reparaciones de celulares, cambios de pantalla, cambios de batería. Arreglo computadores, intercambio piezas, El saldaño es un crack, el mas capito, se las sabe todas, es un grande, nota siete promedio siete la mea vola compañero, de la galactica oiste bb prrrrr, lo iluminati.", precio: 99999 },
    { servicio: "Gasfiter", nombre: "Carlos López", edad: 40, ubicacion: "Ciudad B", ranking: 4.0, img: "https://via.placeholder.com/150", descripcion: "Instalación y reparación de sistemas de plomería.", precio: 10000 },
    { servicio: "Informática", nombre: "Ana Gómez", edad: 25, ubicacion: "Ciudad C", ranking: 4.8, img: "https://via.placeholder.com/150", descripcion: "Asesoría en software y hardware.", precio: 35000 },
    { servicio: "Gasfiter", nombre: "Maria Rodriguez", edad: 35, ubicacion: "Ciudad D", ranking: 3.9, img: "https://via.placeholder.com/150", descripcion: "Mantenimiento de sistemas de agua y gas.", precio: 14500 },
    { servicio: "Informática", nombre: "Pedro Sanchez", edad: 28, ubicacion: "Ciudad E", ranking: 4.7, img: "https://via.placeholder.com/150", descripcion: "Optimización de sistemas y redes.", precio: 65000 },
    { servicio: "Gasfiter", nombre: "Luis Garcia", edad: 45, ubicacion: "Ciudad F", ranking: 4.2, img: "https://via.placeholder.com/150", descripcion: "Servicio completo de gasfitería.", precio: 37990 }
];

export const ServicePage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [filteredElementos, setFilteredElementos] = useState(elementos);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (option: string) => {
        let sortedElementos = [...elementos];
        if (option === 'Mayor Precio') {
            sortedElementos.sort((a, b) => b.precio - a.precio);
        } else if (option === 'Menor Precio') {
            sortedElementos.sort((a, b) => a.precio - b.precio);
        } else {
            sortedElementos = elementos.filter(elemento => elemento.servicio === option);
        }
        setFilteredElementos(sortedElementos);
        handleClose();
    };

    const handleRequestService = (nombre: string) => {
        console.log(`Solicitar servicio de: ${nombre}`);
        // Aquí puedes añadir la lógica para solicitar el servicio
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filtered = elementos.filter(elemento =>
            Object.values(elemento).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(event.target.value.toLowerCase())
            )
        );
        setFilteredElementos(filtered);
    };

    return (
        <Container>
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Servicios Disponibles</Typography>
                <Divider sx={{ width: '100%', mb: 2 }} />
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item>
                        <TextField
                            sx={{width:"800px"}}
                            label="Buscar servicios"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{ 
                                height: '50px', 
                                borderRadius: 1, 
                                backgroundColor: '#D2691E', 
                                '&:hover': {
                                    backgroundColor: '#A0522D',
                                }
                            }}
                            onClick={handleClick}
                        >
                            Filtrar por
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => handleMenuItemClick('Mayor Precio')}>Mayor Precio</MenuItem>
                            <MenuItem onClick={() => handleMenuItemClick('Menor Precio')}>Menor Precio</MenuItem>
                            <MenuItem onClick={() => handleMenuItemClick('Informática')}>Informática</MenuItem>
                            <MenuItem onClick={() => handleMenuItemClick('Gasfiter')}>Gasfiter</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
                {filteredElementos.length > 0 ? (
                    filteredElementos.map((elemento, index) => (
                        <Grid item key={index} sx={{ width: '100%' }}>
                            <Paper sx={{ borderRadius: "1.5em", height: "auto", mt: 3, display: 'flex', alignItems: 'center', p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Avatar src={elemento.img} sx={{ width: 150, height: 150 }} />
                                    </Grid>
                                    <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Typography variant="h6">{`Servicio: ${elemento.servicio}`}</Typography>
                                        <Typography variant="body1">{`Nombre: ${elemento.nombre}`}</Typography>
                                        <Typography variant="body1">{`Edad: ${elemento.edad}`}</Typography>
                                        <Typography variant="body1">{`Ubicación: ${elemento.ubicacion}`}</Typography>
                                        <Typography variant="body1">{`Ranking: ${elemento.ranking}`}</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Typography variant="h6">Descripción</Typography>
                                        <Divider sx={{ mb: 1 }} />
                                        <Typography variant="body2" sx={{ mb: 2 }}>{elemento.descripcion}</Typography>
                                        <Button
                                            variant="contained"
                                            color= "primary"
                                            onClick={() => handleRequestService(elemento.nombre)}
                                        >
                                            Solicitar {elemento.precio} CLP
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" sx={{ mt: 4 }}>
                        Servicio no encontrado :(
                    </Typography>
                )}
            </Grid>
        </Container>
    );
};
