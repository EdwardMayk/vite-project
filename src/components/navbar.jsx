import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useUsuario } from '../context/UsuarioContext';


const CustomNavbar = ({ isSubPeriodPage }) => {
  const navigate = useNavigate();
  const { datosUsuario, actualizarDatosUsuario } = useUsuario();
  const handleLogout = () => {
    // Elimina los datos de usuario del almacenamiento local y del contexto
    localStorage.removeItem('datosUsuario');
    actualizarDatosUsuario(null);

    navigate('/login');
  };
  return (
    <>
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <i className="bi bi-house fs-4"></i>
            <span className="fs-5 d-none d-sm-inline">Menu</span>
          </a>
          <Button variant="danger" onClick={handleLogout}>
            Cerrar sesión
          </Button>
          <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li className="nav-item">
              <Link to="/Inicio" className="nav-link align-middle px-0">
                <i className="bi bi-house fs-4"></i>
                <span className="ms-1 d-none d-sm-inline">Inicio</span>
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-0 align-middle" data-bs-toggle="collapse" data-bs-target="#submenu-repositorio">
                <i className="bi bi-folder fs-4"></i>
                <span className="ms-1 d-none d-sm-inline">Repositorio</span>
              </a>
              <ul className={`collapse nav flex-column ms-1 `} id="submenu-repositorio" data-bs-parent="#menu">
                <li className="w-100">
                  <Link to="/listperiods" className="nav-link px-0">
                    <span className="d-none d-sm-inline">Periodo Alcaldia</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link px-0 align-middle" data-bs-toggle="collapse" data-bs-target="#submenu-areas">
                <i className="bi bi-laptop fs-4"></i>
                <span className="ms-1 d-none d-sm-inline">AREAS / OFICINAS</span>
              </a>
              <ul className={`collapse nav flex-column ms-1 `} id="submenu-areas" data-bs-parent="#menu">
                <li className="w-100">
                  <Link to="/areas" className="nav-link px-0">
                    <i className="bi bi-laptop fs-4" style={{ marginRight: "5px" }}></i>

                    <span className="d-none d-sm-inline">AREAS / OFICINAS</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-0 align-middle" data-bs-toggle="collapse" data-bs-target="#submenu-usuarios">
                <i className="bi bi-people-fill fs-4"></i>
                <span className="ms-1 d-none d-sm-inline">USUARIOS</span>
              </a>
              <ul className={`collapse nav flex-column ms-1 `} id="submenu-usuarios" data-bs-parent="#menu">
                <li className="w-100">
                  <Link to="/listperiods" className="nav-link px-0">
                    <i className="bi bi-people-fill fs-4" style={{ marginRight: "5px" }}></i>
                    <span className="d-none d-sm-inline">Encargados</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link to="/listperiods" className="nav-link px-0">
                    <i className="bi bi-incognito fs-4" style={{ marginRight: "5px" }}></i>

                    <span className="d-none d-sm-inline">Aministrador</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-0 align-middle" data-bs-toggle="collapse" data-bs-target="#submenu-reportes">
                <i className="bi bi-images fs-4"></i>
                <span className="ms-1 d-none d-sm-inline">REPORTES</span>
              </a>
              <ul className={`collapse nav flex-column ms-1 `} id="submenu-reportes" data-bs-parent="#menu">
                <li className="w-100">
                  <Link to="/listperiods" className="nav-link px-0">
                    <i className="bi bi-bar-chart-fill fs-4" style={{ marginRight: "5px" }}></i>
                    <span className="d-none d-sm-inline">Documentos</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link to="/listperiods" className="nav-link px-0">
                    <i className="bi bi-bar-chart-fill fs-4" style={{ marginRight: "5px" }}></i>
                    <span className="d-none d-sm-inline">Documentos Activos</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link to="/listperiods" className="nav-link px-0">
                    <i className="bi bi-bar-chart-fill fs-4" style={{ marginRight: "5px" }}></i>
                    <span className="d-none d-sm-inline">Documentos Perdidos</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link to="/listperiods" className="nav-link px-0">
                    <i className="bi bi-bar-chart-fill fs-4" style={{ marginRight: "5px" }}></i>
                    <span className="d-none d-sm-inline">Reporte de Encargado</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link to="/listperiods" className="nav-link px-0">
                    <i className="bi bi-bar-chart-fill fs-4" style={{ marginRight: "5px" }}></i>
                    <span className="d-none d-sm-inline">Reporte de Administrador</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <hr />
        </div>
      </div>
    </>
  );
}

CustomNavbar.propTypes = {
  isSubPeriodPage: PropTypes.bool,
};

export default CustomNavbar;
