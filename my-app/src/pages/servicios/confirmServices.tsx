import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Paper, Box, Divider, Avatar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: -29.9737,
    lng: -71.3436
};

const ConfirmServicePage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const serviceData = location.state;

    const [destinationCoords, setDestinationCoords] = useState<{ lat: number, lng: number } | null>(null);

    const handleOnLoad = (map: google.maps.Map) => {
        const geocodeAddress = async (address: string) => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address }, (results, status) => {
                if (status === "OK" && results && results[0]) {
                    setDestinationCoords(results[0].geometry.location.toJSON());
                } else {
                    console.error("Geocode was not successful for the following reason: " + status);
                }
            });
        };

        geocodeAddress(serviceData.direccion);
    };

    return (
        <Container>
            <Grid container justifyContent="center">
                <Typography variant="h4" sx={{mt:2, mb:2}}>Confirmación del Servicio</Typography>
            </Grid>
            <Divider/>
            <Paper sx={{ p: 3, mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar src={serviceData.img} sx={{ width: 150, height: 150 }} />
                    </Grid>
                    <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="body1">{`Servicio: ${serviceData.servicio}`}</Typography>
                        <Typography variant="body1">{`Nombre: ${serviceData.nombre}`}</Typography>
                        <Typography variant="body1">{`Edad: ${serviceData.edad}`}</Typography>
                        <Typography variant="body1">{`Ubicación: ${serviceData.ubicacion}`}</Typography>
                        <Typography variant="body1">{`Dirección: ${serviceData.direccion}`}</Typography>
                        <Typography variant="body1">{`Ranking: ${serviceData.ranking}`}</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6">Descripción</Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Typography variant="body1" sx={{ mb: 2 }}>{serviceData.descripcion}</Typography>
                        <Divider sx={{ mb:1 }}/>
                        <Typography variant="h6" sx={{ mb: 2 }}>Precio: {serviceData.precio}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{ mt: 3, p: 2 }}>
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={14}
                        center={center}
                        onLoad={handleOnLoad}
                    >
                        {destinationCoords && (
                            <>
                                <Marker position={center} label="U" />
                                <Marker position={destinationCoords} label="D" />
                            </>
                        )}
                    </GoogleMap>
                </LoadScript>
            </Paper>
            <Grid container spacing={2} sx={{ mt: 3, justifyContent: 'flex-end' }}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => alert("Servicio confirmado")}>
                        Confirmar Servicio
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>
                        Cancelar
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ConfirmServicePage;
