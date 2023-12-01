import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const UsuarioContext = createContext();

const UsuarioProvider = ({ children }) => {
    const [datosUsuario, setDatosUsuario] = useState(() => {
        const storedUsuario = localStorage.getItem('datosUsuario');
        return storedUsuario ? JSON.parse(storedUsuario) : null;
    });

    useEffect(() => {
        localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
    }, [datosUsuario]);

    const actualizarDatosUsuario = (nuevosDatosUsuario) => {
        setDatosUsuario(nuevosDatosUsuario);
    };

    return (
        <UsuarioContext.Provider value={{ datosUsuario, actualizarDatosUsuario }}>
            {children}
        </UsuarioContext.Provider>
    );
};

UsuarioProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

const useUsuario = () => {
    const context = useContext(UsuarioContext);
    if (!context) {
        throw new Error('useUsuario debe ser utilizado dentro de un UsuarioProvider');
    }
    return context;
};


export { UsuarioProvider, useUsuario };
