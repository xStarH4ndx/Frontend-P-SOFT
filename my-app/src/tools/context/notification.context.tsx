import { AlertColor } from '@mui/material';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Notification } from '../../components';

type ContextProps = {
    getError: (msg: string) => void;
    getSuccess: (msg: string) => void; 
};

const NotificationContext = createContext<ContextProps | null>(null);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [msg, setMsg] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

    const handleClose = () => {
        setOpen(false);
    };

    const getError = (msg: string) => {
        setSeverity("error");
        setOpen(true);
        setMsg(msg);
    };

    const getSuccess = (msg: string) => {
        setSeverity("success");
        setOpen(true);
        setMsg(msg);
    };

    const value = {
        getError,
        getSuccess,
    };

    return (
        <NotificationContext.Provider value={value}>
            <Notification
                handleClose={handleClose}
                open={open}
                severity={severity}
                msg={msg}
            />
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotification debe ser usado dentro de un NotificationProvider");
    return context;
};
