import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PeriodoContext = createContext();

export const PeriodoProvider = ({ children }) => {
    // Recuperar el valor de localStorage al montar el componente
    const storedPeriodoSeleccionado = localStorage.getItem('periodoSeleccionado');
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(storedPeriodoSeleccionado || null);

    // Update localStorage whenever periodoSeleccionado changes
    useEffect(() => {
        localStorage.setItem('periodoSeleccionado', periodoSeleccionado);
    }, [periodoSeleccionado]);

    const actualizarPeriodoSeleccionado = (nuevoPeriodo) => {
        setPeriodoSeleccionado(nuevoPeriodo);
    };

    const contextValue = {
        periodoSeleccionado,
        actualizarPeriodoSeleccionado,
    };

    return (
        <PeriodoContext.Provider value={contextValue}>
            {children}
        </PeriodoContext.Provider>
    );
};

PeriodoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const usePeriodo = () => {
    const context = useContext(PeriodoContext);
    if (!context) {
        throw new Error('usePeriodo debe ser utilizado dentro de un PeriodoProvider');
    }
    return context;
};
