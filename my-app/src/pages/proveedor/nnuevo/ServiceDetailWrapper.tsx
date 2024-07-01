// ServiceDetailWrapper.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ServiceDetailPage from "./ServiceDetailPage";

type ServiceType = {
    ID_service: string;
    Nombre: string;
    fotos: string[];
    Costo: number;
    direccion: string;
    tipoServicio: string;
};

const servicesData: ServiceType[] = [
    {
        ID_service: '1',
        Nombre: 'Servicio de Limpieza',
        direccion: 'Calle Falsa 123',
        tipoServicio: 'Limpieza',
        Costo: 50,
        fotos: ['https://via.placeholder.com/150']
    },
    {
        ID_service: '2',
        Nombre: 'Servicio de Jardinería',
        direccion: 'Calle Verdadera 456',
        tipoServicio: 'Jardinería',
        Costo: 70,
        fotos: ['https://via.placeholder.com/150']
    }
];

const ServiceDetailWrapper: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const [service, setService] = useState<ServiceType | null>(null);

    useEffect(() => {
        const foundService = servicesData.find(service => service.ID_service === serviceId);
        setService(foundService || null);
    }, [serviceId]);

    return <ServiceDetailPage service={service} />;
};

export default ServiceDetailWrapper;
