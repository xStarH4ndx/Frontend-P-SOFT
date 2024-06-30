import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/sesiones/home";
import { LoginPage } from "./pages/sesiones/login";
import { RouterLayout } from "./common/RouterLayout";
import { RecoveryPage } from "./pages/sesiones/login/recuperarContra";
import ServicePage from "./pages/clientes/servicios";
import ConfirmServicePage from "./pages/clientes/servicios/confirmServices";
import { RegisterPage } from "./pages/sesiones/registro/registro";
import { CreateServicePage } from "./pages/proveedor/nnuevo/servicio";
import { UserServicePage }from './tools/perfil/UserServicesPage';
import {ResetPasswordPage} from "./pages/sesiones/login/resetearPass";


export const AppRouter: React.FC<{}> = () =>{
    return (
        <Routes>
            <Route path="/" element={<RouterLayout/>}>
                <Route path="/" element={<HomePage/>} />
                <Route path="/servicios" element={<ServicePage/>} />
                <Route path="/servicios/confirmacion" element={<ConfirmServicePage/>} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/recuperarContra" element={<RecoveryPage />} />
            <Route path="/resetearPass" element={<ResetPasswordPage />} />
            <Route path="/registro" element={<RegisterPage/>} />
            <Route path="/mis-servicios" element={<UserServicePage />} />
            <Route path="/crear-servicio" element={<CreateServicePage />} />
        </Routes>
    );
};
