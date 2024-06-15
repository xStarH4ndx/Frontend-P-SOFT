import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { CREAR_USUARIO } from '../../../api/graphql/mutations';
import { useNotification } from "../../../tools/context/notification.context";
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

type RegisterType = {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    confirmPassword: string;
    phone: string;
    roles: number[];
};

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { getError, getSuccess } = useNotification();
    const [registerData, setRegisterData] = useState<RegisterType>({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmPassword: "",
        phone: "",
        roles: []
    });

    const [addNewUser, { loading, error, data }] = useMutation(CREAR_USUARIO);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleRoleChange = (role: number) => {
        const updatedRoles = registerData.roles.includes(role)
            ? registerData.roles.filter(r => r !== role)
            : [...registerData.roles, role];
        setRegisterData({ ...registerData, roles: updatedRoles });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            getError("Las contraseñas no coinciden");
            return;
        }
        try {
            const { data } = await addNewUser({
                variables: {
                    usuarioDTO: {
                        firstname: registerData.firstname,
                        lastname: registerData.lastname,
                        username: registerData.username,
                        password: registerData.password,
                        telephone: registerData.phone,
                        enabled: true,
                        accountLocked: false,
                        roles: registerData.roles
                    }
                }
            });
    
            if (data && data.crearUsuario) {
                getSuccess("Registro exitoso");
                navigate("/login");
            } else {
                getError("No se pudo completar su solicitud");
            }
        } catch (error) {
            getError("No se pudo completar su solicitud");
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
                        <Typography variant="h4">Registrarse</Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                name="firstname"
                                margin="normal"
                                fullWidth
                                label="Nombre"
                                sx={{ mt: 2, mb: 1.5 }}
                                required
                                value={registerData.firstname}
                                onChange={handleChange}
                            />
                            <TextField
                                name="lastname"
                                margin="normal"
                                fullWidth
                                label="Apellido"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                value={registerData.lastname}
                                onChange={handleChange}
                            />
                            <TextField
                                name="username"
                                margin="normal"
                                type="email"
                                fullWidth
                                label="Correo electrónico"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                value={registerData.username}
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
                                value={registerData.password}
                                onChange={handleChange}
                            />
                            <TextField
                                name="confirmPassword"
                                margin="normal"
                                type="password"
                                fullWidth
                                label="Confirmar contraseña"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                value={registerData.confirmPassword}
                                onChange={handleChange}
                            />
                            <TextField
                                name="phone"
                                margin="normal"
                                fullWidth
                                label="Teléfono"
                                sx={{ mt: 1.5, mb: 1.5 }}
                                required
                                value={registerData.phone}
                                onChange={handleChange}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={registerData.roles.includes(1)}
                                    onChange={() => handleRoleChange(1)}
                                />}
                                label="Hacerme usuario"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={registerData.roles.includes(2)}
                                    onChange={() => handleRoleChange(2)}
                                />}
                                label="Hacerme prestador"
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>
                                Registrarse
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

