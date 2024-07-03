import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserType = {
    username: string;
    email: string;
    phone: string;
};

type ServiceType = {
    ID_service: string;
    Nombre: string;
    fotos: string[];
    Costo: number;
    direccion: string;
    tipoServicio: string;
    horarios: string[];
    usuario: string; // Añadido aquí
};

type UserContextType = {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    services: ServiceType[];
    setServices: React.Dispatch<React.SetStateAction<ServiceType[]>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [services, setServices] = useState<ServiceType[]>([
        {
            ID_service: '1',
            Nombre: 'Servicio de Limpieza',
            direccion: 'Calle Falsa 123',
            tipoServicio: 'Limpieza',
            Costo: 50,
            fotos: ['https://via.placeholder.com/150'],
            horarios: ["09:00 AM", "10:00 AM"],
            usuario: 'user1'
        },
        {
            ID_service: '2',
            Nombre: 'Servicio de Jardinería',
            direccion: 'Calle Verdadera 456',
            tipoServicio: 'Jardinería',
            Costo: 70,
            fotos: ['https://via.placeholder.com/150'],
            horarios: ["11:00 AM", "12:00 PM"],
            usuario: 'user2'
        }
    ]);

    return (
        <UserContext.Provider value={{ user, setUser, services, setServices }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
