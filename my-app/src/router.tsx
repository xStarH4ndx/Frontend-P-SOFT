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
import UserServicePage from './tools/perfil/UserServicesPage';
import EditServicePage from './tools/perfil/EditServicePage';
import { Perfil } from './pages/clientes/perfil/perfilUsuario'
import ServiceDetailWrapper from "./pages/proveedor/nnuevo/ServiceDetailWrapper";
import { ResetPasswordPage } from "./pages/sesiones/login/resetearPass";
import ReservationPage from "./pages/proveedor/nnuevo/ReservationPage";


export const AppRouter: React.FC<{}> = () =>{
    return (
        <Routes>
            <Route path="/" element={<RouterLayout/>}>
                <Route path="/" element={<HomePage/>} />
                <Route path="/servicios" element={<ServicePage/>} />
                <Route path="/perfil" element={<Perfil />} />
                
                <Route path="/mis-servicios" element={<UserServicePage />} />
                <Route path="/crear-servicio" element={<CreateServicePage />} />
                <Route path="/editar-servicio/:serviceId" element={<EditServicePage />} />
                <Route path="/servicio/:serviceId" element={<ServiceDetailWrapper />} />

                <Route path="/reservar/:idService/:horario" element={<ReservationPage />} />
                <Route path="/solicitud-servicio/:idService" element={<ConfirmServicePage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/recuperarContra" element={<RecoveryPage />} />
            <Route path="/resetearPass" element={<ResetPasswordPage />} />
            <Route path="/registro" element={<RegisterPage/>} />

        </Routes>
    );
};
