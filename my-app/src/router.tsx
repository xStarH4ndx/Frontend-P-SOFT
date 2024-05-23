import React from "react";
import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RouterLayout } from "./common/RouterLayout";
import { RecoveryPage } from "./pages/nnuevo/recuperarContra";
import { RegisterPage } from "./pages/registro/registro";
import { CreateServicePage } from "./pages/nnuevo/servicio";


export const AppRouter: React.FC<{}> = () =>{
    return (
        <Routes>
            <Route path="/" element={<RouterLayout/>}>
                <Route path="/" element={<HomePage/>} />
            </Route>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/registro" element={<RegisterPage/>} /> 
            <Route path="/login/recuperarContra" element={<RecoveryPage />} />
            <Route path="/nnuevo/servicio" element={<CreateServicePage />} />
        </Routes>
    )
};