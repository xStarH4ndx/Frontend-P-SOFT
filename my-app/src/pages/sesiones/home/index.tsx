import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Button, Container, Divider, Grid, Paper, Typography, CircularProgress, Avatar, Snackbar } from '@mui/material';
import { HeaderComponent } from "../../../components";
import { useNavigate } from "react-router";
import { LISTAR_SERVICIOS } from "../../../api/graphql/queries"; // Asegúrate de importar tu consulta correctamente

interface Autor {
  firstname: string;
  lastname: string;
}

interface Servicio {
  id: number;
  nombre: string;
  costo: number;
  direccion: string;
  evaluaciones: number | null;
  comentarios: string;
  img: string;
  autor: Autor;
}

export const HomePage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Estado para controlar la pantalla de carga
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Estado para verificar si el usuario está autenticado
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const { data, loading: queryLoading, error } = useQuery(LISTAR_SERVICIOS);

  // Verificar si el usuario está autenticado al cargar el componente
  useEffect(() => {
    const checkLoggedInStatus = () => {
      const userLoggedIn = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(userLoggedIn === 'true');
    };

    checkLoggedInStatus();
  }, []);

  if (queryLoading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const servicios: Servicio[] = data?.listarServicios || [];

  // Hacer una copia de servicios antes de ordenarlos
  const serviciosFiltrados = [...servicios]
    .sort((a: Servicio, b: Servicio) => {
      if (a.evaluaciones && b.evaluaciones) {
        return b.evaluaciones - a.evaluaciones;
      } else if (a.evaluaciones) {
        return -1;
      } else if (b.evaluaciones) {
        return 1;
      } else {
        return a.costo - b.costo;
      }
    })
    .slice(0, 3);

  const handleClickVerServicios = () => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirige a la página de login si el usuario no está autenticado
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("servicios");
    }, 1500);
  };

  const handleRequestService = (elemento: Servicio) => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirige a la página de login si el usuario no está autenticado
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/servicio/detalles`, {
        state: {
          id: elemento.id,
          nombre: elemento.nombre,
          costo: elemento.costo,
          direccion: elemento.direccion,
          autorNombreCompleto: `${elemento.autor.firstname} ${elemento.autor.lastname}`,
          comentarios: elemento.comentarios,
          evaluaciones: elemento.evaluaciones,
          imagenUrl: elemento.img,
          fechaInicio: '',
          fechaFin: ''
        },
      });
      setSnackbarOpen(true);
    }, 1500); // Simular una carga de 1.5 segundos antes de navegar
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
        <Divider sx={{ marginTop: "20px" }} />
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2, mt: 2, pl: { xs: 2, sm: 0 } }}>Servicios Populares</Typography>
      </div>
      <Grid container direction="column" alignItems="center" justifyContent="center">
        {serviciosFiltrados.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No hay servicios disponibles :(
          </Typography>
        ) : (
          serviciosFiltrados.map((servicio: Servicio) => (
            <Grid item key={servicio.id} sx={{ width: "100%" }}>
              <Paper sx={{ borderRadius: "1.5em", height: "auto", mt: 3, display: "flex", alignItems: "center", p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Avatar src={servicio.img} sx={{ width: 150, height: 150 }} />
                  </Grid>
                  <Grid item xs={5} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Typography variant="h6">{`Servicio: ${servicio.nombre}`}</Typography>
                    <Typography variant="body1">{`Autor: ${servicio.autor.firstname} ${servicio.autor.lastname}`}</Typography>
                    <Typography variant="body1">{`Costo: ${servicio.costo}`}</Typography>
                    <Typography variant="body1">{`Dirección: ${servicio.direccion}`}</Typography>
                    <Typography variant="body1">{`Evaluaciones: ${servicio.evaluaciones}`}</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Button variant="contained" color="primary" onClick={() => handleRequestService(servicio)}>
                      Solicitar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))
        )}
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
