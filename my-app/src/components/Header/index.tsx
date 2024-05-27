import { Box, Grid, Typography } from "@mui/material";
import React from "react";

type HeaderProps = {
    title: string;
    description: string;
    element?: React.ReactNode | null;
};

export const HeaderComponent: React.FC<HeaderProps> = ({ title, description, element }) => {
    return (
        <Box sx={{ width: "100%", height: "100%", textAlign: "center" }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ height: "100%" }}
            >
                <Grid item xs={12} md={6} lg={5}>
                    <Box sx={{ mt:2 , textAlign: "center" }}>
                        <Typography variant="h1">{title}</Typography>
                        <Typography variant="body1">{description}</Typography>
                        {element && (
                            <Box mt={4} width="100%">
                                {element}
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
