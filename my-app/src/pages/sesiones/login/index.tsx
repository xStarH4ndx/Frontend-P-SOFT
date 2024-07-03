import React, { useState } from "react";
import { useNotification } from "../../../tools/context/notification.context";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, gql, useApolloClient } from '@apollo/client';
import {jwtDecode} from 'jwt-decode'; // Importa jwt-decode correctamente
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { OBTENER_USUARIO, ACCEDER_QUERY } from "../../../api/graphql/queries";

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const client = useApolloClient();
    const { getError, getSuccess } = useNotification();
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const { loading, error, data, refetch } = useQuery(ACCEDER_QUERY, {
        skip: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Datos de inicio de sesión:", loginData);

        try {
            const { data } = await refetch({
                username: loginData.username,
                password: loginData.password,
            });

            if (data && data.acceder) {
                console.log("Respuesta exitosa del servidor:", data);
                const accessToken = data.acceder.access_token;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refresh_token', data.acceder.refresh_token);
                localStorage.setItem('isLoggedIn', 'true');

                // Decodificar el token JWT para obtener los datos del usuario
                const decodedToken: any = jwtDecode(accessToken);
                console.log("Datos del usuario logueado:", decodedToken);
                const userId = decodedToken.id;
                console.log("El id del usuario logueado es:", userId);

                // Obtener detalles del usuario
                const { data: userData } = await client.query({
                    query: OBTENER_USUARIO,
                    variables: { id: userId },
                });

                if (userData && userData.obtenerUsuario) {
                    localStorage.setItem('user', JSON.stringify(userData.obtenerUsuario));
                    localStorage.setItem('isLoggedIn', 'true');
                    getSuccess("Inicio de sesión exitoso");

                    // Verificar el rol del usuario
                    const userRoles = userData.obtenerUsuario.roles;
                    const isProveedor = userRoles.some((role: any) => role.id === 2);
                    if (isProveedor) {
                        navigate("/mis-servicios");
                    } else {
                        navigate("/");
                    }
                } else {
                    getError("No se pudieron obtener los detalles del usuario");
                }
            } else {
                getError("Usuario o contraseña incorrectos");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            getError("Ocurrió un error al intentar iniciar sesión");
        }
    };

    return (
        <Container maxWidth="sm">
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "100vh" }}
            >
                <Grid item>
                    <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                        <Typography variant="h4">Iniciar sesión</Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                name="username"
                                margin="normal"
                                type="email"
                                fullWidth
                                label="Correo electrónico"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <TextField
                                name="password"
                                margin="normal"
                                type="password"
                                fullWidth
                                label="Contraseña"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                onChange={handleChange}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 1.5 }}>
                                {loading ? 'Cargando...' : 'Iniciar sesión'}
                            </Button>
                            <Button
                                component={Link}
                                to="/login/recuperarContra"
                                fullWidth
                                variant="text"
                                sx={{ mt: 1, mb: 3, color: 'text.secondary' }}
                            >
                                ¿Olvidaste tu contraseña?
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
