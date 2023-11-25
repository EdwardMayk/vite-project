import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ArchivadoresContext = createContext();

export const useArchivadores = () => {
    return useContext(ArchivadoresContext);
};

export const ArchivadoresProvider = ({ children }) => {
    const [archivadorSeleccionado, setArchivadorSeleccionado] = useState(() => {
        // Intentar obtener el archivador desde el almacenamiento local al inicio
        const storedArchivador = localStorage.getItem('archivadorSeleccionado');
        return storedArchivador ? JSON.parse(storedArchivador) : null;
    });

    useEffect(() => {
        // Guardar el archivador en el almacenamiento local cada vez que cambia
        localStorage.setItem('archivadorSeleccionado', JSON.stringify(archivadorSeleccionado));
    }, [archivadorSeleccionado]);

    const setArchivador = (archivador) => {
        setArchivadorSeleccionado(archivador);
    };

    return (
        <ArchivadoresContext.Provider value={{ archivadorSeleccionado, setArchivador }}>
            {children}
        </ArchivadoresContext.Provider>
    );
};

ArchivadoresProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
