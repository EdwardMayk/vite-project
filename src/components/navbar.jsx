import PropTypes from 'prop-types';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const SidebarNavbar = ({ activeTab, onTabChange }) => {
  const handleTabClick = (tabName) => {
    onTabChange(tabName);
  };

  return (
    <Navbar bg="light" expand="lg" style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 1000, alignItems: "flex-start" }}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link href="#home" onClick={() => handleTabClick('INICIO')} active={activeTab === 'INICIO'}>INICIO</Nav.Link>

            <NavDropdown title="REPOSITORIO" id="basic-nav-dropdown">
              <NavDropdown.Item href="#link2" onClick={() => handleTabClick('PERIODO_ALCALDIA')} active={activeTab === 'PERIODO_ALCALDIA'}>Periodo de alcaldía</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#link3" onClick={() => handleTabClick('PERIODO_ALCALDIA')} active={activeTab === 'PERIODO_ALCALDIA'}>AYUDA</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

SidebarNavbar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default SidebarNavbar;
