import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RouterLayout } from "./common/RouterLayout";
import { RecoveryPage } from "./pages/nnuevo/recuperarContra";
import { ServicePage } from "./pages/servicios";
import {UserProvider} from "./perfil/UserContext";
import { RegisterPage } from "./pages/registro/registro";
import { CreateServicePage } from './pages/nnuevo/servicio';

export const AppRouter: React.FC<{}> = () => {
    return (
        <Routes>
            <Route path="/" element={<RouterLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/servicios" element={<ServicePage />} />
                <Route path="/perfil" element={<UserProvider children={undefined} />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/recuperarContra" element={<RecoveryPage />} />
            <Route path="/pages/registro/registro" element={<RegisterPage/>} />
            <Route path="/mis-servicios" element={<ServicePage />} />
            <Route path="/crear-servicio" element={<CreateServicePage />} />
        </Routes>
    );
};
