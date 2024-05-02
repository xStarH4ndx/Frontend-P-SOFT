import React from "react";
import { Container, Button, Grid, Paper, Box, Typography, TextField } from '@mui/material';
import { useNotification } from "../../context/notification.context";
import { LoginValidate } from "../../utils/validateForm";


type LoginType = {
    username: string;
    password: string;
};

export const LoginPage: React.FC<{}> = () =>{
    const { getError, getSucces} = useNotification();
    const [loginData, setLoginData]= React.useState<LoginType>({
        username:"",
        password:"",
    });

    const dataLogin=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setLoginData({...loginData, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) =>{
        e.preventDefault();
        LoginValidate.validate(loginData).then(()=>{
            getSucces(JSON.stringify(loginData));
        }).catch((error)=>{
            getError(error.message);
        });
    };



    return (
        <Container maxWidth="sm">
            <Grid container 
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{minHeight: "100vh"}}
            >
                <Grid item>
                    <Paper sx={{padding:"1.2em", borderRadius:"0.5em"}}>
                        <Typography variant="h4">Iniciar Sesion</Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                            name="username"
                                margin="normal"
                                type="email"
                                fullWidth 
                                label="email" 
                                sx={{mt:2,mb:1.5}} 
                                onChange={dataLogin}
                                />
                            <TextField 
                            name="password"
                                margin="normal"
                                type="password"
                                fullWidth 
                                label="password"
                                sx={{mt:1.5,mb:1.5}} 
                                onChange={dataLogin}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{mt:1.5,mb:3}}>Iniciar Sesion</Button>
                        </Box>
                    </Paper>

                </Grid>
            </Grid>
        </Container>
    );
};