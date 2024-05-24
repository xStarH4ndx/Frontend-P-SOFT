import React from "react";
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';
import { useNotification } from "../../context/notification.context";
import { LoginValidate } from "../../utils/validateForm";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations';

type LoginType = {
    username: string;
    password: string;
};

export const LoginPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const { getError, getSucces } = useNotification();
    const [loginData, setLoginData] = React.useState<LoginType>({
        username: "",
        password: "",
    });

    const [login, { loading, error, data }] = useMutation(LOGIN);

    const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await LoginValidate.validate(loginData);
            const response = await login({ variables: { ...loginData } });
            const { token, user } = response.data.login;

            // Almacenar el token en localStorage o en un contexto global
            localStorage.setItem('token', token);

            getSucces(`Welcome, ${user.firstname} ${user.lastname}`);
            navigate("/"); // Redirige a la página de inicio u otra página
        } catch (error: any) {
            getError(error.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Grid container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "100vh" }}
            >
                <Grid item>
                    <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                        <Typography variant="h4">Iniciar Sesión</Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                name="username"
                                margin="normal"
                                type="email"
                                fullWidth
                                label="email"
                                sx={{ mt: 2, mb: 1.5 }}
                                onChange={dataLogin}
                            />
                            <TextField
                                name="password"
                                margin="normal"
                                type="password"
                                fullWidth
                                label="password"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                onChange={dataLogin}
                            />
                            <Button color="primary" fullWidth variant="text" sx={{ mt: 1, mb: 1, fontSize: "0.8rem", textAlign: "left" }} onClick={() => navigate("recuperarContra")}>¿Olvidaste tu contraseña?</Button>
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>Iniciar Sesión</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
