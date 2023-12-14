import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Inicio from './pages/Inicio';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/navbar';
import ListPeriods from './pages/ListPeriods';
import Areas from './pages/Areas';
import AreasOficina from './pages/AreasOficina';
import SubPeriod from './pages/subPeriod';
import Archivador from './components/archivador';
import { ArchivadoresProvider } from './context/ArchivadoresContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UsuarioProvider } from './context/UsuarioContext';
import { PeriodoProvider } from './context/PeriodoContext';
import { AreaProvider } from './context/AreaContext';
import Documentos from './pages/Documento.jsx';
import AddDocument from './components/addDocument.jsx';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const isSubPeriodPage = window.location.pathname.includes('/subperiod/');
  console.log('isSubPeriodPage:', isSubPeriodPage);


  // Función para manejar el cierre de sesión
  // const handleLogout = () => {
  //   setLoggedIn(false);
  // };

  return (
    <>
      <BrowserRouter>
        <UsuarioProvider>
          <PeriodoProvider>
            <AreaProvider>
              <ArchivadoresProvider>
                <div className="app-container" >
                  {isLoggedIn && (
                    <CustomNavbar />
                  )}
                  <div className="content-container" >
                    <Routes>
                      <Route path="/" element={<Login handleLogin={handleLogin} />} />
                      <Route path="/inicio" element={<Inicio />} />
                      <Route path="/listperiods" element={<ListPeriods />} />
                      <Route path="/subperiod" element={<SubPeriod />} />
                      <Route path="/areas" element={<Areas />} />
                      <Route path="/areasoficina" element={<AreasOficina />} />
                      <Route path="/archivador" element={<Archivador />} />
                      <Route path="/documentos" element={<Documentos />} />
                      <Route path='/adddocument' element={<AddDocument />} />
                    </Routes>
                  </div>
                </div>
              </ArchivadoresProvider>
            </AreaProvider>
          </PeriodoProvider>
        </UsuarioProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
