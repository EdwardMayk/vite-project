import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const AreaContext = createContext();

export const useArea = () => {
    return useContext(AreaContext);
};

export const AreaProvider = ({ children }) => {
    const [selectedArea, setSelectedArea] = useState(null);

    const setArea = (area) => {
        setSelectedArea(area);
    };

    return (
        <AreaContext.Provider value={{ selectedArea, setArea }}>
            {children}
        </AreaContext.Provider>
    );
};

AreaProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
