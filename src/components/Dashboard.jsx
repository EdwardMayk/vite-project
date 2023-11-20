import { useState } from 'react';
import SidebarNavbar from './navbar';
import Inicio from './inicio';
import ListPeriods from './ListPeriods';

const Dashboard = () => {
  // Estado para rastrear la pestaña activa
  const [activeTab, setActiveTab] = useState('Inicio');
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);


  // Función para manejar el cambio de pestaña
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleShowAdditionalOptions = () => {
    setShowAdditionalOptions(true);
  };

  // Renderizado condicional del contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'INICIO':
        return <Inicio />;
      case 'PERIODO_ALCALDIA':
        return <ListPeriods showAdditionalOptions={showAdditionalOptions} onSelectClick={handleShowAdditionalOptions} />;

      default:
        return null;
    }
  };

  return (
    <div >
      <SidebarNavbar activeTab={activeTab} onTabChange={handleTabChange} showAdditionalOptions={showAdditionalOptions} />
      <div style={{ marginLeft: '200px' }}>
        {/* Contenido renderizado condicionalmente */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
