import React, { createContext, useContext, useState } from 'react';

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
    usuario: string; // Añadido para identificar el usuario que creó el servicio
};

type UserContextType = {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    services: ServiceType[];
    setServices: React.Dispatch<React.SetStateAction<ServiceType[]>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [services, setServices] = useState<ServiceType[]>([]);

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
