// reseña.tsx
import React, { useState } from 'react';
import { enviarReseñaAlServidor } from './servicio';

export const Reseña = () => {
    const [id, setId] = useState('');
    const [puntuacion, setPuntuacion] = useState('');
    const [comentario, setComentario] = useState('');

    const enviarReseña = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await enviarReseñaAlServidor(id, puntuacion, comentario);
            console.log('Reseña enviada con éxito');
        } catch (error) {
            console.error('Error al enviar la reseña', error);
        }
    };

    return (
        <form onSubmit={enviarReseña}>
            <label>
                ID:
                <input type="text" value={id} onChange={e => setId(e.target.value)} />
            </label>
            <label>
                Puntuación:
                <input type="text" value={puntuacion} onChange={e => setPuntuacion(e.target.value)} />
            </label>
            <label>
                Comentario:
                <textarea value={comentario} onChange={e => setComentario(e.target.value)} />
            </label>
            <input type="submit" value="Enviar" />
        </form>
    );
};