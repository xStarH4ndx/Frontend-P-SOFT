import React from "react";
import {AppBar, Box, Button, Container, Grid, Stack, Toolbar} from "@mui/material";
import Logo from '../assets/images/logo-empresa.png';

export const NavBar: React.FC<{}> = () =>{
    return (
        <Box sx= {{ flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar>
                    <Container maxWidth="xl">
                        <Grid container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item></Grid>
                            <Grid item>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained">Register</Button>
                                    <Button variant="outlined">Login</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
