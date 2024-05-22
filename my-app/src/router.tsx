import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom"
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RouterLayout } from "./common/RouterLayout";
import { RecoveryPage } from "./pages/nnuevo/recuperarContra";
import { RegisterPage } from "./pages/registro/registro";
import { ServicePage } from "./pages/servicios";


export const AppRouter: React.FC<{}> = () =>{
    return (
        <Routes>
            <Route path="/" element={<RouterLayout/>}>
                <Route path="/" element={<HomePage/>} />
                <Route path="/servicios" element={<ServicePage/>} />
            </Route>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/login/recuperarContra" element={<RecoveryPage />} /> 
            <Route path="/registro" element={<RegisterPage/>} /> 
        </Routes>
    )
};