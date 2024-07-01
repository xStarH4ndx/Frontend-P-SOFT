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

const mockServices: ServiceType[] = [
    {
        ID_service: "1",
        Nombre: "Servicio 1",
        fotos: ["https://via.placeholder.com/150"],
        Costo: 100,
        direccion: "Dirección 1",
        tipoServicio: "Tipo 1",
    },
    {
        ID_service: "2",
        Nombre: "Servicio 2",
        fotos: ["https://via.placeholder.com/150"],
        Costo: 200,
        direccion: "Dirección 2",
        tipoServicio: "Tipo 2",
    }
    // Otros servicios de ejemplo
];

const ServiceDetailWrapper: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const [service, setService] = useState<ServiceType | null>(null);

    useEffect(() => {
        const foundService = mockServices.find((s) => s.ID_service === serviceId);
        setService(foundService || null);
    }, [serviceId]);

    const handleSave = (updatedService: ServiceType) => {
        // Actualizar el servicio en el mockServices
        const updatedServices = mockServices.map((s) =>
            s.ID_service === updatedService.ID_service ? updatedService : s
        );
        setService(updatedService);
    };

    const handleDeleteService = () => {
        // Eliminar el servicio del mockServices
        const updatedServices = mockServices.filter((s) => s.ID_service !== serviceId);
        setService(null); // Limpiar el servicio actual después de eliminarlo
    };

    return <ServiceDetailPage service={service} onSave={handleSave} onDelete={handleDeleteService} />;
};

export default ServiceDetailWrapper;
