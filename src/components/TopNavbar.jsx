
import { Navbar, Nav, Form, InputGroup, Button, Dropdown } from 'react-bootstrap';

const TopNavbar = () => {
    return (
        <Navbar expand="lg" variant="dark" bg="dark" className="sb-topnav">
            <Navbar.Brand href="index.html" className="ps-3">Start Bootstrap</Navbar.Brand>
            <Button variant="link" className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!">
                <i className="fas fa-bars"></i>
            </Button>
            <Form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <InputGroup>
                    <Form.Control type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <Button variant="primary" id="btnNavbarSearch" type="button">
                        <i className="fas fa-search"></i>
                    </Button>
                </InputGroup>
            </Form>
            <Nav className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <Nav.Item className="nav-item dropdown">
                    <Nav.Link id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-user fa-fw"></i>
                    </Nav.Link>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <Dropdown.Item href="#!">Settings</Dropdown.Item>
                        <Dropdown.Item href="#!">Activity Log</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#!">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
};

export default TopNavbar;
