import React, { useState, useEffect } from "react";
import {Container,Paper,Grid,Typography,Divider,TextField,Button,Menu,MenuItem,Avatar,CircularProgress,Snackbar} from "@mui/material";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";
import { LISTAR_SERVICIOS } from "../../../api/graphql/queries";

// Definición de la interfaz para el autor
interface Autor {
    firstname: string;
    lastname: string;
}

// Definición de la interfaz para los servicios
interface Servicio {
    id: number;
    nombre: string;
    costo: number;
    direccion: string;
    evaluaciones: number;
    comentarios: string;
    img: string;
    autor: Autor;
}

const ServicePage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(LISTAR_SERVICIOS);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [elementos, setElementos] = useState<Servicio[]>([]);
    const [filteredElementos, setFilteredElementos] = useState<Servicio[]>([]);
    const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

    // Manejar errores y carga de la consulta
    useEffect(() => {
        if (data) {
            setElementos(data.listarServicios);
            setFilteredElementos(data.listarServicios);
        }
    }, [data]);

    if (loading) return <CircularProgress />;
    if (error) return <p>Error: {error.message}</p>;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (option: string) => {
        let sortedElementos: Servicio[] = [...filteredElementos];
        if (option === "Mayor Precio") {
            sortedElementos.sort((a, b) => b.costo - a.costo);
        } else if (option === "Menor Precio") {
            sortedElementos.sort((a, b) => a.costo - b.costo);
        } else if (option === "Por evaluaciones") {
            sortedElementos.sort((a, b) => b.evaluaciones - a.evaluaciones);
        }
        setFilteredElementos(sortedElementos); // Actualizar elementos filtrados según el criterio
        handleClose();
    };

    const handleSearchChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = elementos.filter(
            (elemento) =>
                elemento.nombre.toLowerCase().includes(value) ||
                elemento.direccion.toLowerCase().includes(value)
        );
        setFilteredElementos(filtered); // Actualizar elementos filtrados según el término de búsqueda
    };

    const handleRequestService = (elemento: Servicio) => {
        setLoadingRequest(true);
        setTimeout(() => {
            setLoadingRequest(false);
            const autorNombreCompleto = `${elemento.autor.firstname} ${elemento.autor.lastname}`;
            navigate("confirmacion", {
                state: {
                    ...elemento,
                    autorNombreCompleto,
                    comentarios: elemento.comentarios,
                    evaluaciones: elemento.evaluaciones,
                },
            });
            setSnackbarOpen(true);
        }, 1500); // Simular una carga de 1.5 segundos antes de navegar
    };

    return (
        <Container>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 4 }}
            >
                <Typography variant="h4" gutterBottom>
                    Servicios Disponibles
                </Typography>
                <Divider sx={{ width: "100%", mb: 2 }} />
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item>
                        <TextField
                            sx={{ width: "800px" }}
                            label="Buscar servicios"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            sx={{ height: "50px", borderRadius: 1 }}
                            color="secondary"
                            onClick={handleClick}
                        >
                            Filtrar por
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={() =>
                                    handleMenuItemClick("Mayor Precio")
                                }
                            >
                                Mayor Precio
                            </MenuItem>
                            <MenuItem
                                onClick={() =>
                                    handleMenuItemClick("Menor Precio")
                                }
                            >
                                Menor Precio
                            </MenuItem>
                            <MenuItem
                                onClick={() =>
                                    handleMenuItemClick("Por evaluaciones")
                                }
                            >
                                Por evaluaciones
                            </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 2 }}
            >
                {filteredElementos.length > 0 ? (
                    filteredElementos.map((elemento, index) => (
                        <Grid item key={index} sx={{ width: "100%" }}>
                            <Paper
                                sx={{
                                    borderRadius: "1.5em",
                                    height: "auto",
                                    mt: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    p: 2,
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid
                                        item
                                        xs={3}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Avatar
                                            src={elemento.img}
                                            sx={{ width: 150, height: 150 }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={5}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography variant="h6">{`Servicio: ${elemento.nombre}`}</Typography>
                                        <Typography variant="body1">{`Autor: ${elemento.autor.firstname} ${elemento.autor.lastname}`}</Typography>
                                        <Typography variant="body1">{`Costo: ${elemento.costo}`}</Typography>
                                        <Typography variant="body1">{`Dirección: ${elemento.direccion}`}</Typography>
                                        <Typography variant="body1">{`Evaluaciones: ${elemento.evaluaciones}`}</Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={4}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                handleRequestService(elemento)
                                            }
                                        >
                                            Solicitar
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
            {loadingRequest && (
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.7)",
                        zIndex: 1,
                    }}
                >
                    <CircularProgress color="primary" />
                </Grid>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Solicitud Confirmada"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </Container>
    );
};

export default ServicePage;
