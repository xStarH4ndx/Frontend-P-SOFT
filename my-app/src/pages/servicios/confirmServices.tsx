import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Paper } from "@mui/material";
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
            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h5" gutterBottom>Confirmación del Servicio</Typography>
                <Typography variant="body1">{`Nombre: ${serviceData.nombre}`}</Typography>
                <Typography variant="body1">{`Servicio: ${serviceData.servicio}`}</Typography>
                <Typography variant="body1">{`Edad: ${serviceData.edad}`}</Typography>
                <Typography variant="body1">{`Ubicación: ${serviceData.ubicacion}`}</Typography>
                <Typography variant="body1">{`Dirección: ${serviceData.direccion}`}</Typography>
                <Typography variant="body1">{`Ranking: ${serviceData.ranking}`}</Typography>
                <Typography variant="body1">{`Descripción: ${serviceData.descripcion}`}</Typography>
                <Typography variant="body1">{`Precio: ${serviceData.precio} CLP`}</Typography>
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
            <Grid container spacing={2} sx={{ mt: 3 }}>
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
